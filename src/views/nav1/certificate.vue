<template>
    <section>
        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;margin-top: 20px">
            <el-table-column prop="regTime" label="申请时间"></el-table-column>
            <el-table-column prop="id" label="用户ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="cardId" label="身份证号"></el-table-column>
            <el-table-column prop="state" label="状态" :class="red"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleCertificate(scope.$index, scope.row)">认证</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--认证页面-->
        <el-dialog title="认证" v-model="certifiFormVisible" :close-on-click-modal="false" class="dialog">
            <el-form :model="certifiForm" label-width="80px" ref="certifiForm">
                <el-form-item label="申请时间" prop="time">
                    <span>{{certifiForm.regTime}}</span>
                </el-form-item>
                <el-form-item label="用户ID">
                    <span>{{certifiForm.id}}</span>
                </el-form-item>
                <el-form-item label="姓名">
                    <span>{{certifiForm.name}}</span>

                </el-form-item>
                <el-form-item label="身份证号">
                    <span>{{certifiForm.cardId}}</span>
                </el-form-item>
                <el-form-item label="证件正面">
                    <img :src="certifiForm.id_card_front_oss" class="img"/>
                </el-form-item>
                <el-form-item label="证件背面">
                    <img :src="certifiForm.id_card_back_oss" class="img"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" @click.native="refuse">拒绝</el-button>
                <el-button type="primary" @click.native="certifiSubmit">通过</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
//    import util from '../../common/js/util'
    import { getUserListPage,editUser } from '../../api/api';

    export default{
        data(){
            return{
                users:[],
                total:0,
                page:1,
                listLoading:false,

                certifiFormVisible:false,//认证弹窗是否显示

                // 认证页面的数据
                certifiForm:{

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
                };
                this.listLoading = true;

                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                });
            },
            //显示认证界面
            handleCertificate: function (index, row) {
                this.certifiFormVisible = true;
                this.certifiForm = Object.assign({}, row); // 向certifiForm对象添加属性
            },
            //认证
            certifiSubmit: function () {
                this.$refs.certifiForm.validate((valid) => { // 验证
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => { // 提示窗
                            let para = Object.assign({}, this.certifiForm);
                            editUser(para).then((res) => {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['certifiForm'].resetFields();
                                this.certifiFormVisible = false;
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
    /*.dialog{*/
        /*width:70%;*/
        /*left: 15%;*/
    /*}*/
    .img{
        width: 300px;
        height: 150px;
    }
    .red{
        color: red;
    }
</style>
