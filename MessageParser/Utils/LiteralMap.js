import State from "./State.js"
import Action from "../GlobalAction/Action.js"

export default {
    "預約": State.RESERVE,
    "預約草稿": State.DRAFT,
    "預約查詢": State.CHECK,
    "管理": State.MANAGE,
    "新增管理人員": State.MANAGE_ADD_ADMIN,
    "新增工作人員": State.MANAGE_ADD_STAFF,
    "移除人員": State.MANAGE_REMOVE_PERSON,
    "修改預約": State.MANAGE_EDIT_RESERVATION_SHOW,
    "FSM" : State.FSM,

    "返回": Action.BACK,
    "離開": Action.EXIT
}