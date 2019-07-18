<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div v-loading="loading">
        <el-radio-group v-model="reqParams.collect" style="margin-bottom:20px" @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>

        <el-button
          size="small"
          @click="dialogFormVisible = true"
          style="float:right"
          type="success"
        >添加素材</el-button>

        <el-dialog title="添加素材" :visible.sync="dialogFormVisible" width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span class="el-icon-star-off" @click="togglefav(item)" :class="{red:item.is_collected}"></span>

            <span class="el-icon-delete" @click="delImage(item)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 1,
      dialogFormVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('73toutiao')).token
      },
      loading: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    delImage (item) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'

      }).then(async () => {
        await this.axios.delete('user/images/' + item.id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
      })
    },
    async togglefav (item) {
      const { data: { data } } = await this.axios.put('user/images/' + item.id, { collect: !item.is_collected })
      this.$message.success('操作成功')

      item.is_collected = data.collect
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogFormVisible = false
        this.getImages()
        this.imageUrl = null
      }, 1500)
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    float: left;
    width: 280px;
    height: 280px;
    border: 1px dashed #ddd;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
