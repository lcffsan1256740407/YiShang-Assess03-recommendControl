<template>
    <router-view></router-view>
</template>

<script>
export default {
    name:'ShowListPage',
    mounted(){
        this.$router.replace({
            name:'list'
        })
    }
}
</script>

<style>

</style>