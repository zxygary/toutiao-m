<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录表单 -->
    <!-- 
      表单验证：
        1. 给 van-field 组件配置 rules 验证规则
          参考文档：https://vant-contrib.gitee.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2. 当表单提交的时候会自动触发表单验证
          如果验证通过，会触发 submit 事件
          如果验证失败，则不会触发
     -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          name="手机号"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          v-model="user.code"
          name="验证码"
          placeholder="请输入验证码"
          :rules="userFromRules.code"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-button class="send-sms-btn" round size="small" type="default"
              >发送验证码</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div style="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  data() {
    return {
      user: {
        mobile: "13911111111", // 手机号
        code: "246810", // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user;

      // TODO: 2. 表单验证

      // 在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 持续时间，默认是2000，如果为0，则持续展示
      });

      // 3. 提交表单请求登录
      try {
        const res = await login(user);
        console.log("登录成功", res);
        this.$toast.success("登陆成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败, 清稍后重试");
        }
      }

      // 4. 根据请求响应结果处理后续操作
    },
  },
};
</script>

<style scoped lang="less">
.login-coutainer {
  .toutiao {
    font-size: 37px;
  }

  .send-sns-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
