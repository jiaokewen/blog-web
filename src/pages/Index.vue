<template>
    <Row v-if="doneInit"  class="layout" type="flex">
    <Col span="4" class="layout-menu-left">
      <div class="layout-user">
        <Avatar icon="person" size="large" />
        <div class="layout-user__info">
          <div class="layout-user__name">欢迎</div>
          <div class="layout-user__role">{{ user.realName }}</div>
        </div>
      </div>
            <Menu @on-select="onMenuSelect" ref="menu" :active-name="activeName" theme="dark" width="auto" :open-names="openNames">  
        <Submenu v-for="m in menus" :key="m.supplierMenuId" :name="m.menuName">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            {{m.menuName}}
          </template>
          <MenuItem v-for="sm in m.children" :key="sm.supplierMenuId" :name="sm.menuName">
            {{sm.menuName}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
    <Col ref="body" class="right-panel" span="20">
      <div class="layout-header">
        <div class="layout-header__logo">
            博客后台管理系统
        </div>
        <div @click="userset" class="layout-header__btn">
          <Icon type="gear-a"></Icon>
          个人信息
        </div>
        <div @click="logout" class="layout-header__btn">
          <Icon type="log-out"></Icon>
          退出登录
        </div>
      </div>
      <div class="layout-breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem v-for="b in breadcrumb" :key="b.url" :href="b.url ? b.url : ''">
            {{b.name}}
          </BreadcrumbItem>
        </Breadcrumb>
       </div>
      <div class="layout-content">
        <router-view class="layout-content-main"></router-view>
      </div>
    </Col>
    <div v-if="toTopOpacity > 0.1" @click="toTop" class="to-top" :style="{ opacity: toTopOpacity }">
      <Icon class="to-top__icon" type="arrow-up-b"></Icon>
    </div>
  </Row>
  <div v-else></div>
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
      logoUrl: require("@/assets/imgs/yanbao.png"),
      user: {},
      menus: [],
      openNames: [],
      activeName: "",
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
    //Promise.all([SysDict.load(),DistrictService.load()]).then(() => {
      this.doneInit = true;
      this.$nextTick(() => {
        // 加载初始数据成功后开始初始化页面
        this.$refs.body.$el.addEventListener("scroll", this.handleScroll);
        // if (!UserService.hasUserSession()) {
        //   this.$router.replace({ path: "/login" });
        // }
        this.menus = [
          ...this.menus,
          this.shopMenu
        ];
        this.user = UserService.getUser();
      });
    //});
  },
  methods: {
    onMenuSelect(name) {
      let allMenuItem = this.menus.reduce((sofar, m) => {
        return [...sofar, ...m.children];
      }, []);

      let menu = allMenuItem.find(m => {
        return m.menuName === name;
      });
      if (menu.url) {
        this.showIndex = false;
      } else {
        this.showIndex = true;
      }
      this.$router.push({ path: adaptor[menu.url] });
    },
    handleScroll(e) {
      this.bodyTop = e.target.scrollTop;
    },
    toTop() {
      this.bodyTop = 0;
      this.$refs.body.$el.scrollTop = 0;
    },
    userset() {
      this.$router.push({ path: R.kUserSet });
    },
    logout() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确认退出登录吗？",
        onOk: () => {
          this.$Notice.destroy();
          UserService.localLogout();
          this.$router.replace({ path: R.kLogin });
        }
      });
    }
  },
  computed: {
    toTopOpacity() {
      if (this.bodyTop > 200) {
        return 0.6;
      }
      return this.bodyTop / 200 * 0.6;
    },
    breadcrumb() {
      return this.$route.meta.bread;
    }
  }
};
</script>
<style lang="less" scoped>
@tabbar-height: 60px;
@breadcrumb-height: 30px;
@content-margin: 15px;
.layout {
  background: #f5f7f9;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.layout-breadcrumb {
  height: @breadcrumb-height;
  padding: 10px 15px 0;
}

.layout-content {
  min-height: calc(
    ~"100% - @{tabbar-height} - @{breadcrumb-height} - @{content-margin}"
  );
  margin: @content-margin;
  margin-bottom: 0px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-menu-left {
  background: #464c5b;
  overflow-y: scroll;
  overflow-x: hidden;
}

.layout-header {
  text-align: right;
  height: @tabbar-height;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &__btn {
    font-size: 13px;
    display: inline-block;
    padding: 20px 10px;
    height: 100%;
    cursor: pointer;
  }

  &__logo {
    float: left;
    font-size: 15px;
    font-style: italic;
    margin-left: 15px;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    cursor: pointer;
  }

  &__btn:hover {
    background-color: #efefef;
  }
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
  }

  &__role {
    font-size: 12px;
    color: #aaa;
  }
}

.right-panel {
  overflow-y: scroll;
  overflow-x: hidden;
}

.to-top {
  color: white;
  background-color:#08CB0D;
  position: fixed;
  right: 40px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0.4;
  transition: 0.3s;
  z-index: 999;

  &:hover {
    opacity: 1;
  }

  &__icon {
    color: #fff;
    display: block;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
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
</style>