import { Router } from 'express';
import auth from '../middleware/auth';
import {
  categoryController,
  branchController,
  promotionCampaignController,
  productController,
  userController,
  orderController,
} from './../controller';

const router = Router();

router.get('/categories', categoryController.getAllCategory);
router.post('/categories', auth, categoryController.createCategory);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategoryById);
router.delete('/categories/:id', categoryController.deleteCategoryById);

router.get('/branches', branchController.getAllBranch);
router.post('/branches', auth, branchController.createBranch);
router.get('/branches/:id', branchController.getBranchById);
router.put('/branches/:id', branchController.updateBranchById);
router.delete('/branches/:id', branchController.deleteBranchById);

router.get('/promotion-campaigns', promotionCampaignController.getAllPromotionCampaign);
router.post('/promotion-campaigns', auth, promotionCampaignController.createPromotionCampaign);
router.get('/promotion-campaigns/:id', promotionCampaignController.getPromotionCampaignById);
router.put('/promotion-campaigns/:id', promotionCampaignController.updatePromotionCampaignById);
router.delete('/promotion-campaigns/:id', promotionCampaignController.deletePromotionCampaignById);

router.get('/products', productController.getAllProduct);
router.post('/products', auth, productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProductById);
router.delete('/products/:id', productController.deleteProductById);

router.get('/user/', auth, userController.getCurrentUser);
router.post('/user/register', userController.userRegister);
router.post('/user/login', userController.userLogin);
router.get('/user/logout', userController.userLogout);

router.get('/orders/:id', orderController.getOrderById);
router.get('/orders', orderController.getAllOrder);
router.post('/orders', orderController.createOrder);
router.post('/orders/update-status', orderController.changeOrderStatus);

export default router;
