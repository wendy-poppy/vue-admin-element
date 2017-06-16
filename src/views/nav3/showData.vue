<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 10px;">
            <!--时间选择-->
            <el-select v-model="timeType" @change="typeChange">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <!--精确选择-->
            <div class="block" v-show="dataPicker" style="display: inline-block;float: right">
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
        </el-col>

        <!--工具条-->
        <el-col :span="24" class="toolbar flex" style="padding-bottom: 10px;">
            <div class="label" >注册用户数：</div>
            <div class="label" >实名认证人数：</div>
        </el-col>

        <!--列表-->
        <el-table :data="users" v-loading="listLoading" style="width: 100%;margin-top: 20px">
            <el-table-column prop="user_create_time" label="名称" ></el-table-column>
            <el-table-column prop="phone" label="收卡数量" ></el-table-column>
            <el-table-column prop='name' label="金额" ></el-table-column>
            <el-table-column prop="all_user_card_no" label="消耗数量" ></el-table-column>
            <el-table-column prop="used_user_card_no" label="金额" ></el-table-column>
            <el-table-column prop="used_user_card_no" label="错卡"></el-table-column>
        </el-table>

    </section>
</template>

<script>
    import { getUserList } from '../../api/api';
    export default{
        data(){
            return{
                dataPicker:false,
                users:[],
                listLoading:false,
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
            //获取列表
            getUsers() {
                let para = {
                };
                this.listLoading = true;
                getUserList(para).then((res) => {
                    this.users = res.data.users;
                    this.listLoading = false;
                });
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