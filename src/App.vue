<template>
	<div>
		<a href="#" class="go_home"><img src="./images/home.png" width=40 alt=""></a>
    	<router-view></router-view>
    </div>
</template>

<script>

  	export default {

  	}

</script>

<style lang="less">
	.go_home{
		position: fixed;
		z-index: 1000000;
		bottom:8rem;
		right: 0.5rem
	}
</style>
