<template>
  <main>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); background: #dcebc8"
      title="MCS"
      sub-title=""
    />
    <div class="action-refresh">
      <a-button type="primary" :loading="iconLoading" @click="scanBtnHandler">
        <template #icon> <RedoOutlined /></template>
        Scan
      </a-button>
      <a-button style="margin-left: 10px" type="primary" @click="openScanQR()">
        Scan QR
      </a-button>
      <a-button style="margin-left: 10px" type="default" @click="openQRScan()">
        +
      </a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" :loading="isLoading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'pairingInstruction'">
          <a-button
            :class="record.class"
            type="primary"
            :danger="record?.attributes?.['1/6/0']"
            :loading="record?.loading"
            @click="handlePairing(record)"
          >
            {{ record?.attributes ? "Unpair" : "Pairing" }}
          </a-button>
          <a-button
            style="margin-left: 10px"
            type="default"
            :disabled="!record?.attributes"
            @click="goToDetail(record)"
          >
            Detail
          </a-button>
        </template>
        <template v-if="column.key === 'status'">
          <div class="statusIcon" v-if="record?.attributes?.['1/6/0']">
            <OnIcon />
          </div>
          <div class="statusIcon" v-if="!record?.attributes?.['1/6/0']">
            <OffIcon />
          </div>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:visible="visible"
      title="Basic Modal"
      @ok="handleOk"
      @cancel="visible = false"
    >
      <div>Commission Code</div>
      <a-input v-model:value="commissionCode" placeholder="Commission Code" />
    </a-modal>
    <a-modal
      v-model:visible="qrScanModalVisible"
      title="Scan"
      @ok="handlePairingWithQR"
      @cancel="qrScanModalVisible = false"
    >
      <!--   @click="openQRScan()" -->
      <a-input v-model:value="qrCode" placeholder="Enter Device Code" />
      <qrcode-vue
        style="margin: auto; margin-top: 10px; margin-bottom: 10px"
        :value="qrCode"
        :size="300"
        level="H"
      />

      <!-- <qrcode-stream @detect="onDetect"></qrcode-stream> -->
    </a-modal>
    <a-modal
      v-model:visible="scanQrCode"
      title="ScanQR"
      @ok="handleScanQR"
      @cancel="scanQrCode = false"
    >
      <!--   @click="openScanQR()" -->
      <!-- <a-input v-model:value="qrCode" placeholder="Enter Device Code" /> -->

      <!-- <qrcode-stream @detect="onDetect"></qrcode-stream> -->
    </a-modal>
  </main>
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      value: "https://example.com",
      size: 300,
    };
  },
  components: {
    QrcodeVue,
  },
};
</script>
<script setup>
import { RedoOutlined } from "@ant-design/icons-vue";
import { ref, onMounted, toRaw } from "vue";
import router from "../router";
import axios from "axios";
import { QrcodeStream } from "vue-qrcode-reader";
import OnIcon from "../components/icons/IconStatusOn.vue";
import OffIcon from "../components/icons/IconStatusOff.vue";
// import { socket } from "@/socket";
import {
  COMMISSION_ON_NETWORK,
  COMMISSION_WITH_CODE,
  DISCOVER,
  GET_NODES,
  REMOVE_NODE,
  START_LISTENING,
} from "../utils/consts";
const visible = ref(false);
const qrScanModalVisible = ref(false);
const scanQrCode = ref(false);
const curentItem = ref({});
const dataSource = ref([]);
const dataSourcefromDiscover = ref([]);
const isLoading = ref(true);

const booleanValue = ref("Pairing");

// const socketConnect = new WebSocket("ws://10.10.14.81:5580/ws");
const socketConnect = new WebSocket("ws://172.16.10.232:5580/ws");

socketConnect.onopen = (event) => {
  getNodes();
  // discover();
  startListening();
};

socketConnect.onmessage = (event) => {
  isLoading.value = true;
  const formatData = JSON.parse(event.data);
  switch (formatData.message_id) {
    case "1": // GET NODES
      dataSource.value = formatData.result;
      break;
    case "2": // DISCOVER
      let newArray = dataSource.value.map((item) => item);
      let twoItemArray = [...newArray, ...formatData.result];
      dataSource.value = [twoItemArray[0], twoItemArray[1]];
      break;
    case "5": // REMOVE NODE
      location.reload();
      break;
    case "6": // COMMISSION WITH CODE
      getNodes();
      discover();
      break;
    case "8": // COMMISSION ON NETWORK
      break;
    default:
      console.log("Default switch case");
  }
  isLoading.value = false;
};

socketConnect.onclose = (event) => {
  console.log("CLOSED CONNECTION");
};

const discover = () => {
  isLoading.value = true;
  socketConnect.send(JSON.stringify(DISCOVER));
};

const startListening = () => {
  isLoading.value = true;
  socketConnect.send(JSON.stringify(START_LISTENING()));
};

const getNodes = () => {
  isLoading.value = true;
  socketConnect.send(JSON.stringify(GET_NODES));
};

const commissionCode = ref();
const qrCode = ref();

onMounted(() => {});

const columns = ref([
  {
    title: "Device Id",
    dataIndex: "productId",
    key: "productId",
  },
  {
    title: "Name",
    dataIndex: "deviceName",
    key: "deviceName",
  },
  {
    title: "Action",
    dataIndex: "pairingInstruction",
    key: "pairingInstruction",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
]);

const iconLoading = ref(false);

const scanBtnHandler = (e) => {
  discover();

  iconLoading.value = true;

  setTimeout(() => {
    iconLoading.value = false;
  }, 1000);
};

const handlePairing = (event) => {
  if (event?.attributes) {
    socketConnect.send(JSON.stringify(REMOVE_NODE(event.node_id)));
  } else {
    visible.value = true;
  }
};

const handleOk = () => {
  booleanValue.value = "Unpair";
  console.log(booleanValue.value);
  socketConnect.send(
    JSON.stringify(COMMISSION_WITH_CODE(commissionCode.value))
  );
  visible.value = false;
};

const handleOkQRModal = () => {
  visible.value = false;
  isLoading.value = true;
  socketConnect.send(
    JSON.stringify(JSON.stringify(COMMISSION_WITH_CODE(commissionCode.value)))
  );
};

const goToDetail = (record) => {
  console.log(record);
  router.push({
    name: "detail",
    path: "/detail",
    params: {
      id: record.node_id,
    },
  });
};

const openQRScan = () => {
  qrScanModalVisible.value = true;
};

const handlePairingWithQR = (detectedCode) => {
  socketConnect.send(JSON.stringify(COMMISSION_WITH_CODE(qrCode.value)));
};
const handleScanQR = (detectedCode) => {
  // socketConnect.send(JSON.stringify(COMMISSION_WITH_CODE(qrCode.value)));
};

const openScanQR = () => {
  scanQrCode.value = true;
};

const onDetect = (detectedCodes) => {
  qrScanModalVisible.value = false;
  handlePairingWithQR(detectedCodes[0].rawValue);
};
</script>

<!-- <style>
.action-refresh {
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
}

button.success {
  background: #55c13b;
  color: white;
}
.statusIcon {
  width: 50px;
  margin: auto;
}
</style> -->
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
/* #components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
} */
</style>
