<template>
    <section>
        <!--查询-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="姓名/电话"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top: 20px">
            <el-table-column prop="card_no" label="卡号"></el-table-column>
            <el-table-column prop="order_no" label="订单号"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="face_value" label="面值"></el-table-column>
            <el-table-column prop="add_time" label="添加时间"></el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import { getUserListPage } from '../../api/api';

    export default{
        data(){
            return{
                filters: {
                    phone: ''
                },
                users:[],
                total:0,
                page:1,
                listLoading:false
            }
        },
        methods:{
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    phone: this.filters.phone
                };
                this.listLoading = true;

                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
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

</style>
