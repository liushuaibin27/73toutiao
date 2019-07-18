<template>
 <div>
     hahahahah <br>
     <slot :test='testname'></slot>
     hahahahah <br>
     <slot name="ppp"></slot>
     hahahahah <br>
     <slot name="ooo"></slot>
     hahahahah <br>

 </div>
</template>

<script>
export default {
  data () {
    return {
      testname: '小红是条狗'
    }
  }
}
</script>

<style scoped lang='less'>

</style>
