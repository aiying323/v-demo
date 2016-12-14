<template>
<section>
	<h1>我是父组件hello</h1>
	<a-header :name="name">
		
	</a-header>
</section>
	
</template>
<script>
	import aHeader from '../components/a.vue';
	export default{
		data() {
			return {
				name:"张三丰"
			}
		},
		components: {
			aHeader
		}
	}
</script>