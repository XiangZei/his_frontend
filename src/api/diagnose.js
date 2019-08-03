import request from '@/utils/request'

export function getpatientlist(docid){
  return request({
    url:'/diagnose/getPatientList?docid='+docid,
    method:'GET'
  })
}

export function submitmedicalmainpage(medicalmainpage){
  return request({
    url:'/diagnose/submitMedicalMainPage',
    method: 'POST',
    data:medicalmainpage
  })
}

export function changestatus(registid){
  return request({
    url:'/diagnose/changeStatus',
    method:'POST',
    data:{
      "registid":registid
    }
  })
}

export function openpre(medicalrecordid,registid,docid,medicalrecordname){
  return request({
    url:'/diagnose/addPrescription',
    method:'POST',
    data:{
      "medicalrecordid":medicalrecordid,
      "registid":registid,
      "docid":docid,
      "medicalrecordname":medicalrecordname,
      "createtime":"",
      "status":1
    }
  })
}

export function filldetail(prescriptionid,detailmsg){
  return request({
    url:'/diagnose/filldetail',
    method:'POST',
    data:{
      "prescriptionid":prescriptionid,
      "drugid":detailmsg.drugid,
      "usage":detailmsg.usage,
      "uselevel":detailmsg.uselevel,
      "freq":detailmsg.freq,
      "num":detailmsg.num,
      "status":1
    }
  })
}
//this.prescriptionSelection[a].prescriptionname,this.patient.registid,this.patient.mdeicalrecordid
export function cancel(prescriptionname,registid,medicalrecordid){
  return request({
    url:'/diagnose/cancel',
    method:'POST',
    data:{
      "prescriptionname":prescriptionname,
      "registid":registid,
      "medicalrecordid":medicalrecordid,
      "status":2
    }
  })
}

export function searchdrug(code){
  return request({
    url:'/diagnose/searchdrug?code='+code,
    method:'GET'
  })
}

export function getPrescriptionList(){
  return request({
    url:'/diagnose/getPrescriptionTemplateList',
    method:'GET'
  })
}

export function getprescriptionDetail(id){
  return request({
    url:'/diagnose/getPrescriptionDetail?id='+id,
    method:'GET'
  })
}

export function getIllnessCata(){
  return request({
    url:'/diagnose/getIllnessCata',
    method:'GET'
  })
}

export function searchill(val){
  return request({
    url:'/diagnose/searchill?cataid='+val,
    method:"GET"
  })
}
// "illcode": "SH",
// "illname": "伤寒",
// "icdcode": "A01.001"
// "illid":1
export function addFirstDiagnose(diagnoseill,medicalrecordid,registid){
  return request({
    url:'/diagnose/addFirstDiagnose',
    method:"POST",
    data:{
      "illid":diagnoseill.illid,
      "diagnosetype":diagnoseill.diagnosetype,
      "finaldiagnose":1,
      "medicalrecordid":medicalrecordid,
      "registid":registid,
      "diagnosetime":""
    }
  })
}

export  function getdiagnose(medicalrecordid,registid){
  return request({
    url:'/diagnose/getDiagnose',
    method:"POST",
    data:{
      "medicalrecordid":medicalrecordid,
      "registid":registid
    }
  })
}
