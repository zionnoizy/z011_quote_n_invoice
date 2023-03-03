
export const reupload_pdf = (oldhashid, fullPath, newer_pdf_base64) => {
    //console.log("[reupload_pdf]");
  

    const storage_ref = ref(storage, fullPath + hashid + ".pdf");
  
  
    uploadString(storage_ref, newer_pdf_base64, 'data_url')
    .then((snapshot) => {
  
      getDownloadURL(snapshot.ref).then(async (newer_url) => {
        const get_id = firebase.firestore().collection("ALL_quote").doc(oldhashid);
        get_id
        .update({
            q_pdf_link: newer_url.toString(),
        })
        .then(() => {
            //console.log("set doc");
  
            get_id.get().then((d) => {
                //console.log("[reupload_pdf] reupdated data:", d.data());
            });
        });

  
      })
  
      //console.log('[reupload_pdf] Uploaded a base64 string pdf version!');
    });
    
  }
