<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="isCollapse?'64px':'200px'">
      <div :class="isCollapse?'logo1':'logo'"></div>

      <el-col :span="12">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#002233"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="width:100%"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header class="home-head">
        <i class="el-icon-s-fold" @click="toggleMenu()"></i>
        <span>江苏传智播客教育有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" :src="avatar" alt />
            <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      avatar: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('73toutiao'))
    this.name = user.name
    this.avatar = user.photo
  },

  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('73toutiao')
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;

  .my-aside {
    background: #002033;

    .el-menu-vertical-demo {
      border-right: none;
    }
    .logo {
      width: 100%;
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .logo1 {
      width: 100%;
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin_01.png) no-repeat
        center;
    }
  }
  .home-head {
    border-bottom: 1px solid #ddd;
    width: 100%;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    .el-icon-s-fold {
      font-size: 28px;
      vertical-align: middle;
      margin: 0 10px;
    }
    span {
      vertical-align: middle;
    }
    img {
      vertical-align: middle;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
