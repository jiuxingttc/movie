<template>
  <div class="home">
     <el-carousel indicator-position="outside" height="700px">
    <el-carousel-item v-for="item in images" :key="item">
      <img style="width:100%;height:100%;" :src="item.url"/>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
          { url: require("@/assets/1.jpg")},
          { url: require("@/assets/2.jpg")},
          { url: require("@/assets/3.jpg")},
          
        ],
    };
  }
}
</script>
