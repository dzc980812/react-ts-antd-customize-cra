import React, { PureComponent } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { emit } from '@/utils/emit';

class SelectLang extends PureComponent {
	locales: [string, string] = ['zh_CN', 'en_US'];

	languageLabels: any = {
		zh_CN: '简体中文',
		en_US: 'English',
	};

	// Menu默认
	initLocales: string = localStorage.locales || 'zh_CN';

	state = {
		// 当前Menu
		currentName: this.languageLabels[this.initLocales],
	};

	handleChange = (val: any) => {
		this.setState({ currentName: this.languageLabels[this.locales[val.key]] });
		emit.emit('change_language', this.locales[val.key]);
	};

	menu = (
		<Menu onClick={(e: any) => this.handleChange(e)}>
			{this.locales.map((res: any, index: number) => {
				return <Menu.Item key={index}>{this.languageLabels[res]}</Menu.Item>;
			})}
		</Menu>
	);

	render() {
		return (
			<Dropdown overlay={this.menu}>
				<span>
					{this.state.currentName} <DownOutlined />
				</span>
			</Dropdown>
		);
	}
}

export default SelectLang;
