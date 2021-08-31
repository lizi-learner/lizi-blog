const common = require('../utils/common');
const errorTypes = require('../constants/error-types');
const service = require('../service/admin.service')
const dataFormat = require('dateformat')


class AdminController {
    //得到管理员列表
    async list(ctx, next){
        const query = ctx.request.query;

        //验证参数
        if(!common.checkParams(query, ['page', 'rows'])){
            const error = new Error(errorTypes.LACK);
            return ctx.app.emit('error', error, ctx);
        }

        //去数据库进行分页查询
        let result, count;
        try {
            [result, count] = await service.queryAdminList(query);
        } catch(e) {
            const error = new Error(e.sqlmessage);
            return ctx.app.emit('error', error, ctx);
        }

        //给返回结果赋值
        const list = [];
        result.forEach(v => {
            let obj = {
                id: v.id,
                username: v.username,
                name: v.name,
                role: v.role,
                lastLoginAt: dataFormat(v.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                createdAt: dataFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
            }
            list.push(obj)
        })

        ctx.body = {
            code: 200,
            msg: "成功获取管理员列表",
            data: {
                list: list,
                count: count,
            }
        }
    }

    //得到管理员信息
    async info(ctx, next){
        const id = ctx.request.params.id;
        console.log(id)
        //查询
        let result;
        try {
            result = await service.queryAdminbyId(id);
        } catch(e) {
            const error = new Error(e.sqlmessage);
            return ctx.app.emit('error', error, ctx);
        }
        
        if(result.length !== 1){
            ctx.body = {
                code: 204,
                msg: '找不到指定的管理员'
            }
        } else {
            result = result[0]
            ctx.body = {
                code: 200,
                msg: '成功查询管理员数据',
                data: {
                    id: result.id,
                    username: result.username,
                    role: result.role,
                    lastLoginAt: dataFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                    createdAt: dataFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                }
            }
        }
    }
  
    //添加管理员
    async add(ctx, next){
        const formData = ctx.request.body;
    
        //检验参数
        if(!common.checkParams(formData, ['username', 'password', 'name', 'role'])){
            const error = new Error(errorTypes.LACK);
            return ctx.app.emit('error', error, ctx);
        }
        try {
            await service.addAdmin(formData);
        } catch (e){
            const error = new Error(e.sqlMessage);
            return ctx.app.emit('error', error, ctx);
        }
        
        ctx.body = {
            code: 200,
            msg: "成功添加"
        }
    }
  
    //修改管理员
    async update(ctx, next){
        const formData = ctx.request.body;
        //检验参数
        if(!common.checkParams(formData, ['username', 'password', 'name', 'role', 'id'])){
            const error = new Error(errorTypes.LACK);
            return ctx.app.emit('error', error, ctx);
        }

        try {
            await service.updateAdmin(formData);
        } catch (e){
            const error = new Error(e.sqlMessage);
            return ctx.app.emit('error', error, ctx);
        }

        ctx.body = {
            code: 200,
            msg: "成功修改"
        }
    }
  
    //删除管理员
    async remove(ctx, next){
        const id = ctx.request.body.id;
        try {
            await service.removeAdmin(id);
        } catch(e){
            const error= new Error(e.sqlMessage);
            return ctx.app.emit('error', error, ctx);
        }
        
        ctx.body = {
            code: 200,
            msg: "成功删除"
        }
    }
  
}

module.exports = new AdminController()