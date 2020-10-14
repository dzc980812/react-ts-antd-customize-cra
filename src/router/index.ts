import Home from '../page/Home';
import Login from '../page/Login';
import Test from '../page/Test';
import List from '../page/List';

export const sideBar = [
	{
		name: 'Home',
		path: '/',
		component: Home,
	},
	{
		name: 'Login',
		path: '/login',
		component: Login,
	},
	{
		name: 'Test',
		path: '/test',
		children: [
			{
				name: 'Test1',
				path: '/test/test1',
				component: Test,
			},
		],
	},
	{
		name: 'List',
		path: '/list',
		children: [
			{
				name: 'List1',
				path: '/list/list',
				component: List,
			},
			{
				name: 'List2',
				path: '/list/list1',
				component: Home,
			},
			{
				name: 'List3',
				path: '/list/list2',
				component: Test,
			},
		],
	},
];

const routers: any = [];
function changeRouter(router: any) {
	router.map((item: any, index: number) => {
		if (!item.children) {
			// 没有children并且component 存在
			routers.push(item);
		} else {
			if (item.component) {
				routers.push(item);
			}
			changeRouter(item.children);
		}
	});
	return routers;
}
changeRouter(sideBar);
export default routers;
