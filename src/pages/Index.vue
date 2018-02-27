<template>
  <div class="layout">
      <div class="layout-header">
        <div class="layout-header__logo">
           <p style="font-size: 20px;color: #fff">博客后台管理系统</p>
        </div>
        <!-- <div @click="refreshCache" class="layout-header__btn">
          <Icon type="refresh"></Icon>
          刷新缓存
        </div> -->
        <div @click="userset" class="layout-header__btn">
          <Icon type="gear-a"></Icon>
          用户设置
        </div>
        <div @click="logout" class="layout-header__btn">
          <Icon type="log-out"></Icon>
          退出登录
        </div>
      </div>
      <Row type="flex" class="layout-body">
        <Col span="4" class="layout-menu-left">
        <div class="layout-user">
        <Avatar icon="person" size="large" />
        <div class="layout-user__info">
          <div class="layout-user__name">{{user.loginUser}}</div>
          <div class="layout-user__role">{{user.realName}}</div>
        </div>
      </div>
      <Menu @on-select="onMenuSelect" ref="menu" :active-name="activeName" theme="light" width="auto" :open-names="openNames" style="text-align:left">  
        <Submenu v-for="m in menus" :key="m.id" :name="m.menuName">
          <template slot="title">
            <!-- <Icon :type="m.menuIcon"></Icon> -->
            <Icon type="ios-navigate"></Icon>
            {{m.menuName}}
          </template>
          <MenuItem v-for="sm in m.children" :key="sm.id" :name="sm.menuName">
            {{sm.menuName}}
          </MenuItem>
        </Submenu>
      </Menu>
        </Col>
        <Col span="20" class="right-panel">
          <div class="layout-bread">
            <Breadcrumb>
              <BreadcrumbItem v-for="b in breadcrumb" :key="b.url" :href="b.url ? b.url : ''">
                {{b.name}}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div ref="body" class="layout-content">
            <div class="layout-content-top">
              <div class="top-content">
                <span class="title"><Icon type="ios-paper-outline"></Icon>  {{ contentName }}</span>
              </div>
            </div>
            <router-view class="layout-content-main">
            </router-view>
            <div class="tool">
              <div v-if="toTopOpacity > 0.1" @click="toTop" class="to-top" :style="{ opacity: toTopOpacity }">
                <Icon class="tool__icon" type="arrow-up-b"></Icon>
              </div>
              <div v-if="!$route.meta.topLevel" @click="goback" class="goback">
                <Icon class="tool__icon" type="arrow-left-b"></Icon>
              </div>
            </div>
          </div>
        </Col>
      </Row>
  </div>
</template>
<script>
import * as R from "@/router/router-types";
import UserService from "@/service/UserService";
import SysDict from "@/service/SysDict";
import DistrictService from '@/service/DistrictService'
/**
 * 适配器，适配原有的html页面的url到当前项目的router的url
 */
let adaptor = {
  content_menu: R.kContentManage
};

export default {
  data() {
    return {
      user: {},
      menus: [],
      openNames: [],
      contentName: '',
      activeName: undefined,
      bodyTop: 0,
      doneInit: false,
      shopMenu: {
        menuGrade: 1,
        menuName: "博客管理",
        parentSupplierMenuId: -1,
        supplierMenuId: 10,
        text: "博客管理",
        url: null,
        attributes: {},
        children: [
          {
            attributes: { leaf: true },
            children: [],
            menuGrade: 2,
            menuName: "博客管理",
            parentSupplierMenuId: 10,
            supplierMenuId: 101,
            text: "博客管理",
            url: "content_menu"
          }
        ]
      },
    };
  },
  mounted() {
    Promise.all([
      SysDict.load()
    ]).then(() => {
      this.$indicator.close()
      this.doneInit = true
      this.$nextTick(() => {
        this.user = UserService.getUser()
        this.$refs.body.addEventListener("scroll", this.handleScroll)
        this.menus = [
          ...this.menus,
          this.shopMenu
        ]
      })
    })
  },
  methods: {
    onMenuSelect (name) {
      let allMenuItem = this.menus.reduce((sofar, m) => {
        return [...sofar, ...m.children]
      }, [])

      let menu = allMenuItem.find(m => {
        return m.menuName === name
      })
      this.$router.push({ path: adaptor[menu.url] })
    },
    handleScroll (e) {
      this.bodyTop = e.target.scrollTop
    },
    toTop () {
      this.bodyTop = 0
      this.$refs.body.scrollTop = 0
    },
    userset () {
      this.$router.push({ path: R.kUserSet })
    },
    logout () {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '确认退出登录吗？',
        onOk: () => {
          this.$Notice.destroy()
          UserService.localLogout()
          this.$router.push({ path: R.kLogin })
        }
      })
    },
    refreshCache () {
      window.location.reload()
    },
    goback () {
      this.$router.go(-1)
    }
  },
  computed: {
    toTopOpacity () {
      if (this.bodyTop > 200) {
        return 0.6
      }
      return this.bodyTop / 200 * 0.6
    },
    breadcrumb () {
      let arr = this.$route.meta.bread
      this.contentName = arr[arr.length - 1].name
      return this.$route.meta.bread
    }
  }
}
</script>

<style lang="less" scoped>
@tabbar-height: 60px;
@breadcrumb-height: 30px;
@content-margin: 15px;

.layout {
  position: absolute;
  background: #f2f2f2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.layout-header {
  text-align: right;
  height: @tabbar-height;
  width: 100%;
  background: #3E9FEC;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  &__btn {
    font-size: 13px;
    display: inline-block;
    padding: 20px 10px;
    height: 100%;
    color: #fff;
    cursor: pointer;
  }

  &__logo {
    float: left;
    margin-left: 35px;
    margin-top: 5px;
    height: 100%;
    align-items: center;
    text-align: center;
    cursor: pointer;
  }

  &__btn:hover {
    background-color: #93EDAB;
  }
}
.layout-body {
  text-align: left;
  height: calc(~"100% - @{tabbar-height}");
  width: 100%;
}
.layout-menu-left {
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff;
}
.layout-bread {
  height: @breadcrumb-height;
  padding: 10px 15px 0;
  margin: 0
}

.right-panel {
  overflow-y: scroll;
  overflow-x: hidden;
}

.layout-content {
  height: calc(~"100% - @{breadcrumb-height} - @{content-margin}");
  margin: @content-margin;
  margin-bottom: 0px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.top-content {
  width: 12.35%;
  height: 40px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  background-position:0 0;
  background-repeat: no-repeat;
  background-image: url('../assets/imgs/top-tixing.png');
}
.layout-content-top {
  background: #fff;
  background-image: url('../assets/imgs/top-line.png');
  background-size: 100% 4px;
  background-repeat: no-repeat;
  padding-bottom: 1px;
}
.layout-content-main {
  padding: 10px;
}
.layout-user {
  height: 50px;
  margin: 15px 24px;
  display: flex;
  align-items: center;
  color: white;

  &__info {
    margin-left: 10px;
  }

  &__name {
    font-size: 15px;
    color: #495060;
  }

  &__role {
    font-size: 12px;
    color: #495060;
  }
}

/*默认滚动条样式*/
::-webkit-scrollbar {
    width: 2px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: #eee;
}
::-webkit-scrollbar-thumb {
    border: 1px #808080 solid;
    border-radius: 10px;
    background: #999;
}
::-webkit-scrollbar-thumb:hover {
    background: #7d7d7d;
}

.tool {
  position: fixed;
  right: 40px;
  bottom: 60px;
  z-index: 999;

  &__icon {
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
  }
}

.goback, .to-top {
  opacity: .6;
  color: white;
  background-color: #58b7ff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
}

.goback {
  background-color: #5f5f5f;
}

.to-top {
  transition: .3s;
  margin-bottom: 10px;

  &:hover {
    opacity: 1
  }
}
</style>