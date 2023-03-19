import GET from "@/plugins/axios";
import { getProd } from "@/plugins/getBackend";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";

const cookie = useCookies().cookies;
const cookieData = { expire: "365d", sameSite: "" };
const themes = ["dark", "light"];

type VueUser = { username: string; logged: boolean };

export const useUser = defineStore("useUser", {
  state: () => {
    return {
      username: "",
      reg: false,
      con: true,
      conMsg: "Reconnecting",
      theme: "light",
      plCount: 0,
      gamesCount: 0,
    };
  },
  actions: {
    checkCookie() {
      if (cookie.get("username") == null) {
        this.updateAnonCookie();
      } else {
        this.updateAnonCookie();
        this.username = cookie.get("username");
        this.reg = JSON.parse(cookie.get("reg"));
      }
    },

    updateAnonCookie() {
      GET("vue_user").then((res) => {
        let data: VueUser = res.data;
        this.setUser(data);
      });
    },

    setUser(vueUser: VueUser) {
      this.username = vueUser.username;
      this.reg = vueUser.logged;
      const prod = getProd();
      const d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 24 * 365);
      cookie.set(
        "username",
        this.username,
        d.toUTCString(),
        "",
        "",
        prod,
        "Lax"
      );
      cookie.set(
        "reg",
        this.reg.toString(),
        d.toUTCString(),
        "",
        "",
        prod,
        "Lax"
      );
    },

    updatePlCount(cnt: number): void {
      this.plCount = cnt;
    },

    updateGamesCount(cnt: number): void {
      this.gamesCount = cnt;
    },

    onReconnect() {
      this.con = false;
      document.body.classList.add("offline");
      document.body.classList.remove("online");
      document.body.classList.add("reconnected");
    },

    onOpen() {
      this.con = true;
      document.body.classList.add("online");
      document.body.classList.remove("offline");
      this.conMsg = "Reconnecting";
    },

    getTheme(): string {
      const theme = cookie.get("theme");
      if (themes.includes(theme)) {
        return theme;
      }
      return "dark";
    },

    toggleHeader() {
      document
        .querySelectorAll(".topnav a")
        .forEach((t) => t.classList.toggle("navbar-show")),
        document.querySelector(".hamburger")?.classList.toggle("is-active");
    },

    setTheme(theme: string) {
      cookie.set("theme", theme);
      document.querySelector("html")?.setAttribute("data-theme", theme);
    },
  },
});
