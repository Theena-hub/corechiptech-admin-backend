const router = require('express').Router();
const banner = require('../controller/banner');
const pic = require('../middleware/upload1');

router.post("/add_banner",pic.single("bannerImage"),banner.addBanner);
router.post("/get_banner",banner.getBanner);
router.post("/delete_banner",banner.deleteBanner);

module.exports = router;