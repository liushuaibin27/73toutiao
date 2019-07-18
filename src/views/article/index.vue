<template>
  <div class="article-container">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form :model="reqParams" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
         <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changedate"
            v-model="datevalues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        根据筛选条件共查询到
        <b>{{total}}</b>条结果：
      </div>
      <el-table style="width: 100%" :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" lazy alt width="100px" height="75px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status==0">草稿</el-tag>
            <el-tag v-if="scope.row.status==1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status==2">审核成功</el-tag>
            <el-tag type="warning" v-if="scope.row.status==3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status==4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" plain circle @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" plain circle @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="reqParams.page"
          @current-change="changepager"
          layout="prev, pager, next"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      options: [],
      datevalues: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    edit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`articles/${id}`)
        this.getArticle()
        this.$message.success('删除成功')
      }).catch(() => {

      })
    },
    changepager (pager) {
      this.reqParams.page = pager
      this.getArticle()
    },
    search () {
      this.reqParams.page = 1
      this.getArticle()
    },
    changedate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },

    async getArticle () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
.el-form-item {
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
