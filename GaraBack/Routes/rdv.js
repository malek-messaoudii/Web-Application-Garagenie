const express=require('express');
const router=express.Router();
const rdvController =require ('../Controllers/rdvcontroller');

router.post('/addrdv', async (req, res) => {
    const result = await rdvController.addRdv(req.body);
    res.status(result.success ? 200 : 400).json(result);
});



router.delete('/rdv/:id', async (req, res) => {
    const result = await rdvController.deleteRdv(req.params.id);
    res.status(result.success ? 200 : 400).json(result);
});

router.get('/user/:email', rdvController.getByUserEmail);

router.get('/getall', rdvController.getAll)

router.put('/rdv/:id', async (req, res) => {
    const result = await rdvController.updateRdv(req.params.id, req.body);
    res.status(result.success ? 200 : 400).json(result);
});

router.get('/get/:numdevis', rdvController.getByNumDevis);
router.put('/update/:numdevis', rdvController.updateByNumDevis);
router.get('/rdvbyemailperso/:emailperso', rdvController.getRdvByEmailPerso);

router.get('/emails/:emailperso', rdvController.getEmailsByEmailPerso);
router.put('/update/:id', rdvController.updateRdv);


router.post('/addrdv1', rdvController.addrdv1);
router.get('/getb/:_id', rdvController.getRdvById);

module.exports=router;