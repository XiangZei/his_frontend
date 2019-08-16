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

export function regis(form){
    return request({
        url:'/registration/regis',
        method:'POST',
        data:form
    })
}

export  function getRegistMsg(medicalNum){
  return request({
    url:'/registration/getRegistMsg?medicalrecordid='+medicalNum,
    method:"GET"
  })
}

export function withdrawRegis(registid){
  return request({
    url:'/registration/withdrawRegis?registid='+registid,
    method:'GET'
  })
}
export function getPayType(){
  return request({
    url:'/registration/getPayType',
    method:'GET'
  })
}

export function settlement(registid,medicalrecordid,docid,chargetype,invoiceNum){
  return request({
    url:'/registration/settlement',
    method:'POST',
    data:{
      "registid":registid,
      "medicalrecordid":medicalrecordid,
      "docid":docid,
      "chargetype":chargetype,
      "invoicenum":invoiceNum
    }
  })
}

export function feeSettlement(registid,medicalrecordid,docid) {
  return request({
    url:'/registration/feeSettlement',
    method:'POST',
    data:{
      "registid":registid,
      "medicalrecordid":medicalrecordid,
      "docid":docid,
      "chargetype":0,
      "invoicenum":0
    }
  })
}

export function getPreMsg(medicalrecordid){
  return request({
    url:'/registration/getPreMsg?medicalrecordid='+medicalrecordid,
    method:'GET'
  })
}

export function settlement_1(registid,docid,form,row){
  return request({
    url:'/registration/Settlement',
    method:'POST',
    data:{
      "registid":registid,
      "pd":row.prescriptionid,
      "protype":1,
      "drugname":row.drugname,
      "fee":row.fee,
      "quantity":row.num,
      "depid":row.depid,
      "starttime":row.createtime,
      "startdocid":row.docid,
      "chargetime":"",
      "docid":docid,
      "medicalrecordid":form.medicalrecordid,
      "pdi":row.pdi,
      "paytype":form.paytype,
    }
  })
}

export function startinvoice(form,personid){
  return request({
    url:'/registration/startinvoice',
    method:'POST',
    data:{
        "invoicenum":form.invoiceid,
        "invoicefee":form.fee,
      "invoicevalid":1,
      "time":"",
      "personid":personid,
      "registid":form.medicalrecordid,
      "chargetype":form.paytype,
      "rushredinvoice":'',
      "invoicestate":0
    }
  })
}
