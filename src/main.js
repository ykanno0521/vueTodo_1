// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = "todos-vuejs-demo";
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function (todo, index) {
      todos.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

const app = new Vue({
  el: "#app",
  data: {
    todos: []
  },
  methods: {
    // TODO追加の処理
    doAdd: function (event, value) {
      // refで名前をつけておいた要素を取得
      var comment = this.$refs.comment;
      // 入力がなければ何もしないで、return
      if (!comment.value.length) {
        return;
      }
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      });
      // フォームを空にする
      comment.value = "";
    },
    // 状態変更の処理
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1;
    },
    // 削除処理
    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  created() {
    // インスタンス作成時に自動的にfetch（）する
    this.todos = todoStorage.fetch();
  }
});
