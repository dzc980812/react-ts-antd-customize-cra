import React, { Component } from 'react';
import routers from './router';
import intl from 'react-intl-universal';
import BasicLayout from './layout/BasicLayout';
import locales from './locales/locales';
import { emit } from '@/utils/emit';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config'

class App extends Component {
	constructor(props: any) {
		super(props);
		this.state = {
			antdLang: locales['zh_CN'], // 修改antd  组件的国际化
		};
	}
	componentDidMount() {
		emit.on('change_language', (lang: string) => this.loadLocales(lang)); // 监听语言改变事件
		this.loadLocales(localStorage.locales || 'zh_CN'); // 初始化语言
	}
	loadLocales(lang: string) {
		intl
			.init({
				currentLocale: lang, // 设置初始语音
				locales,
			})
			.then(() => {
				localStorage.setItem('locales', lang);
				this.setState({
					antdLang: locales[lang],
				});
			});
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					{routers.map((item: any, key: number) => {
						return (
							<Route
								exact
								key={key}
								path={item.path}
								render={(props: any) => {
									return (
										<BasicLayout {...props}>
											<item.component {...props} />
										</BasicLayout>
									);
									// return item.name === 'Login' ? (
									// 	<item.component {...props} />
									// ) : (
									// 	<BasicLayout {...props}>
									// 		<item.component {...props} />
									// 	</BasicLayout>
									// );
								}}
							/>
						);
					})}
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
