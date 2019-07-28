import request from '@/utils/request'

export function getdoclist(depName,regType){
    return request({
        url:'/registration/getDocList?depName='+depName+'&regType='+regType,
        method:'GET'
    })
}

export function getrequiremsg(){
    return request({
        url:'/registration/getRequireMsg',
        method:'GET'
    })
}

export function getpatientmsg(medicalNum){
    return request({
        url:'/registration/getPatientMsg?medicalNum='+medicalNum,
        method:'GET'
    })
}

export function getleft(docNum){
    return request({
        url:'/registration/getleft?docNum='+docNum,
        method:'GET'
    })
}

//未实现
export function regis(form){
    return request({
        url:'/registration/regis',
        method:'POST',
        data:form
    })
}