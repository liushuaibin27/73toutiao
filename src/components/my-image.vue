<template>
  <div class="image-container">
    <div class="img-btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="37%">
      <el-tabs v-model="activeName" type="card" @tab-click="activeName?'image':'upload'">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框区 -->
          <div style="margin-bottom:10px">
            <el-radio-group
              @change="toggleImage"
              v-model="reqParams.collect"
              style="margin-bottom:20px"
            >
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>

          <!-- 图片列表 -->
          <div
            class="img-item"
            v-for="item in images"
            :key="item.id"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selected(item.url)"
          >
            <img :src="item.url" />
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 10000,
      selectedImageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('73toutiao')).token
      },
      imageUrl: null,
      defaultImage
    }
  },
  created () {},

  methods: {
    // 确认图片 显示在主页上
    confirmImage () {
      this.dialogVisible = false
      if (this.activeName === 'image') {
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else if (this.activeName === 'upload') {
        // this.value = this.imageUrl
        this.$emit('input', this.selectedImageUrl)
      }
    },
    // 上传图片成功后预览
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
      // 把上一次数据清空

      this.selectedImageUrl = null

      this.imageUrl = null
      this.getImages()
    },
    // 素材列表分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 素材列表页切换
    toggleImage () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 获取列表
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    },
    // 选中当前点击图片 给样式之类的
    selected (url) {
      // 给当前点击的图片 加上selected
      // :class="{selected:条件}"
      // 条件：根据当前图片的URL 去匹配遍历的时候URL  一致加 不一致不加
      this.selectedImageUrl = url
    }
  }
}
</script>

<style scoped lang='less'>
.image-container{
   width: 150px;
  height: 150px;
  display: inline-block;
  margin: 10px;
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      // 一个和图片一样大小的容器  有半透明背景 打钩图标
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 60px 60px;
    }
  }
  img {
    height: 100%;
    width: 100%;
    display: block;
    // 图片属性，让图片按照等比例缩放显示在容器内
    object-fit: contain;
  }
}
</style>
