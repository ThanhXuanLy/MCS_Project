<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <a-layout style="height: 100%;">
        <a-layout-sider breakpoint="lg"
                        collapsed-width="0"
                        @collapse="onCollapse"
                        @breakpoint="onBreakpoint">
            <div style="text-align: center;">
                <span class="full-width" style="font-size: 80px; color: whitesmoke;">MCS</span>
            </div>
            <a-menu theme="dark" mode="inline">
                <a-menu-item key="1">
                    <user-outlined />
                    <span class="nav-text">Dashboard</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined />
                    <span class="nav-text">QR Scan</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="{ background: '#fff', padding: 0 }" class="boxshadow"/>
            <a-layout-content :style="{ margin: '24px 16px 0' }">
                <RouterView />
            </a-layout-content>
            <a-layout-footer style="text-align: center; background: #001529; color: whitesmoke;">
                Copyright 2020 Rikkeisoft. All rights reserved.
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style>
    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    nav {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
    }

        nav a.router-link-exact-active {
            color: var(--color-text);
        }

            nav a.router-link-exact-active:hover {
                background-color: transparent;
            }

        nav a {
            display: inline-block;
            padding: 0 1rem;
            border-left: 1px solid var(--color-border);
        }

            nav a:first-of-type {
                border: 0;
            }

    @media (min-width: 1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            text-align: left;
            margin-left: -1rem;
            font-size: 1rem;
            padding: 1rem 0;
            margin-top: 1rem;
        }
    }

    body {
        place-items: baseline;
    }

    #app {
        display: block;
        width: 100%;
        height: 100%;
    }

    .title-home-page {
        background: blue;
    }

    .logo {
        height: 70px;
        margin: 16px;
    }

    .full-width {
        width: 100%;
        height: 100%;
    }

    .site-layout-sub-header-background {
        background: #fff;
    }

    .site-layout-background {
        background: #fff;
    }

    [data-theme='dark'] .site-layout-sub-header-background {
        background: #141414;
    }

    .boxshadow {
        box-shadow: 0px 0px 3px #888888;
    }
</style>
