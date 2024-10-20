<template>
    <div class="container">
        <div>
            <h1 class="text-404">404</h1>
            <p class="subtext">Oops! Page not found.</p>
            <el-button size="large" class="btn-home" onclick="window.location.href='/login'">Go to Home</el-button>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f0f0f0;
        color: #333;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .container {
        text-align: center;
    }

    .text-404 {
        font-size: 6rem;
        color: #333;
        margin-bottom: 20px;
        position: relative;
        animation: moveUp 1s ease-in-out infinite alternate;
    }

    @keyframes moveUp {
        0% {
            transform: translateY(0);
        }

        100% {
            transform: translateY(-20px);
        }
    }

    .subtext {
        font-size: 1.2rem;
        margin-bottom: 30px;
        color: #777;
    }

    .btn-home {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        text-transform: uppercase;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-home:hover {
        background-color: #0056b3;
    }
</style>