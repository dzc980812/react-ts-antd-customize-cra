import React, { Component } from 'react';
import { sideBar } from '../router/index';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { propRouterType, propType } from './BasicLayoutType';
import SelectLang from '@components/SelectLang/index';

import intl from 'react-intl-universal';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class BasicLayout extends Component<propType> {
	renderMenu(item: propRouterType) {
		return (
			<Menu.Item key={item.path}>
				<NavLink to={item.path}> {intl.get(item.name)}</NavLink>
			</Menu.Item>
		);
	}

	render() {
		const openKey: string = `/${this.props.match.path.split('/')[1]}`;
		const breadList: string[] = this.props.match.path.split('/');

		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Sider>
					<Header>222</Header>
					<Menu mode="inline" selectedKeys={[this.props.match.path]} defaultOpenKeys={[openKey]}>
						{sideBar.map((item: propRouterType) => {
							return !item.children ? (
								this.renderMenu(item)
							) : (
								<SubMenu title={intl.get(item.name)} key={item.path}>
									{item.children.map((res: propRouterType) => {
										return (
											<Menu.Item key={res.path}>
												<Link to={res.path}> {intl.get(res.name)}</Link>
											</Menu.Item>
										);
									})}
								</SubMenu>
							);
						})}
					</Menu>
				</Sider>
				<Layout>
					<SelectLang></SelectLang>
					<Content style={{ margin: '24px 16px 0' }}>
						<Breadcrumb>
							<Breadcrumb.Item>
								<Link to="/">
									<HomeOutlined />
								</Link>
							</Breadcrumb.Item>
							{breadList.map((res: string, index: number) => {
								return !res ? (
									''
								) : (
									<Breadcrumb.Item key={index}>
										<span>{res}</span>
									</Breadcrumb.Item>
								);
							})}
						</Breadcrumb>
						{this.props.children}
					</Content>
				</Layout>
			</Layout>
		);
	}
}
export default BasicLayout;
