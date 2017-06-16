<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
            <!--精确选择-->
            <div class="block" style="display: inline-block;">
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <div class="right" style="float: right;">
                <div class="mount" style="display: inline-block;margin-right: 20px;">
                    <span>打款总额：2222222222</span>
                </div>
                <el-button type="warning">导出EXCEL</el-button>
            </div>
        </el-col>

        <!--列表-->
        <el-table :data="users" v-loading="listLoading" style="width: 100%;margin-top: 20px">
            <el-table-column prop="extract_time" label="提现时间" ></el-table-column>
            <el-table-column prop="user_phone" label="用户账号" ></el-table-column>
            <el-table-column prop='name' label="用户名字" ></el-table-column>
            <el-table-column prop="amount" label="提现金额" ></el-table-column>
            <el-table-column prop="bank_name" label="银行" ></el-table-column>
            <el-table-column prop="card_no" label="卡号" ></el-table-column>
            <el-table-column prop="state" label="状态" ></el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button size="small" @click="handleEvent(scope.$index, scope.row)">打款凭证</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--打款凭证-->
        <el-dialog title="打款凭证" v-model="userInfo" :close-on-click-modal="false" class="dialog">
            <el-form :model="financeInfo" label-width="80px" ref="financeInfo">

            </el-form>
        </el-dialog>

    </section>
</template>

<script>
    import { getUserListPage } from '../../api/api';
    export default{
        data(){
            return{
                dataPicker:false,
                listLoading:false,
                total:0,
                page:1,
                users:[],

                userInfo:false,//凭证弹窗

                // 凭证弹窗数据
                financeInfo:{},

                options:[{
                    value:'time',
                    label:'精确选择'
                },{
                    value:'0',
                    label:'今天'
                },{
                    value:'1',
                    label:'近三天'
                },{
                    value:'2',
                    label:'近七天'
                },{
                    value:'3',
                    label:'近一个月'
                },{
                    value:'4',
                    label:'全部'
                }],
                timeType:'0',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6: '',
                value7: ''
            }
        },
        methods:{
            typeChange(){
                if(this.timeType == 'time'){
                    this.dataPicker = true;
                }else{
                    this.dataPicker = false;
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取列表
            getUsers() {
                let para = {
                    page: this.page,
                };
                this.listLoading = true;

                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                });
            },
            // 显示凭证界面
            handleEvent:function (index,row) {
                this.userInfo = true;
                this.financeInfo = Object.assign({},row);
            }
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>
    .flex{
        display: flex;
        justify-content:center;
    }
    .label{
        font-size: 24px;
        width: 50%;
        text-align: center;
    }
</style>