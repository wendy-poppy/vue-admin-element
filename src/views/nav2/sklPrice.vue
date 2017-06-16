<template>
    <section>
        <!--查询-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="用户账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top: 20px">
            <el-table-column prop="add_time" label="注册时间"></el-table-column>
            <el-table-column prop="phone" label="用户账号"></el-table-column>
            <el-table-column prop="name" label="用户姓名"></el-table-column>
            <el-table-column prop="oil_discount" label="加油卡回收价"></el-table-column>
            <el-table-column prop="recharge_discount" label="话费卡回收价"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--修改页面-->
        <el-dialog title="价格修改" v-model="sklPriceInfo" :close-on-click-modal="false" class="dialog">
            <el-form :model="changePrice" label-width="100px" ref="changePrice">
                <el-form-item label="加油卡回收价" prop="oil_discount">
                    <el-input v-model="changePrice.oil_discount"></el-input>
                </el-form-item>
                <el-form-item label="话费卡回收价" prop="recharge_discount">
                    <el-input v-model="changePrice.recharge_discount"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click.native="sklPriceInfo = false">取消</el-button>
                <el-button type="primary" @click.native="changeSubmit">确定</el-button>
            </div>
        </el-dialog>


    </section>
</template>

<script>
    import { getUserListPage,editUser } from '../../api/api';

    export default{
        data(){
            return{
                filters: {
                    phone: ''
                },
                users:[],
                total:0,
                page:1,
                listLoading:false,

                sklPriceInfo:false,//修改弹窗是否显示

                // 修改页面的数据
                changePrice:{
                    recharge_discount:0,
                    oil_discount:0
                }
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
            },
            //显示修改界面
            handleChange: function (index, row) {
                this.sklPriceInfo = true;
                this.changePrice = Object.assign({}, row); // 向changePrice对象添加属性
            },
            // 修改价格
            changeSubmit: function () {
                this.$refs.changePrice.validate((valid) => { // 验证
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => { // 提示窗
                            let para = Object.assign({},this.changePrice);
                            editUser(para).then((res) => {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['changePrice'].resetFields();
                                this.sklPriceInfo = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
        },
        mounted() {
            this.getUsers();
        }
    }
</script>

<style scoped>

</style>
