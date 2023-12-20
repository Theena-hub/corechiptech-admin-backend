const firestore = require("../dbConfig");
const bannerDetails = firestore.collection('banner');

exports.addBanner = (req, res) => {
  const { bannerId, bannerName, bannerText, bannerButton, bannerUrl } = req.body;
  try {
    const bannerImage = `http://localhost:1234` + "/" + req.file.path;
    if( !bannerName || !bannerText || !bannerButton || !bannerUrl || !bannerImage ){
      throw "Missing data";
    } 
    const data = {
      BannerName : bannerName,
      BannerImage : bannerImage,
      BannerText : bannerText,
      BannerButton : bannerButton,
      BannerUrl : bannerUrl
    }
    if(!bannerId){
      bannerDetails.add(data)
      .then(() => res.send({ status: "success", data: "Banner added successfully" }))
      .catch(() => {throw "Banner adding failed"});
    } else {
      bannerDetails.doc(bannerId).update(data)
      .then(() => res.send({ status: "success", data: "Banner updated successfully" }))
      .catch(() => {throw "Banner updating failed"});
    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.getBanner = async (req,res) => {
  try{
    const banners = await bannerDetails.get();
    const bannersArray = banners.docs.map(doc => ({Id: doc.id, ...doc.data()}));
    console.log('All Banner Details:', bannersArray);
    res.send({ status: "success", data: bannersArray });  
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};

exports.deleteBanner = async (req, res) => {
  const {bannerId} = req.body;
  try{
    if (!bannerId) {
      throw "missing parameter";
    }
    const data = await bannerDetails.doc(bannerId).get();
    if(data.exists){
      bannerDetails.doc(bannerId).delete()
      .then(() => res.send({ status: "success", data: "Banner deleted successfully" }))
      .catch(() => {throw "Error in deleting Banner"});
    } else {
      throw "Error in finding Banner";
    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
}