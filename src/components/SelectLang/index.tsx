import React, { PureComponent } from 'react';
import { Menu, Select } from 'antd';
import { emit } from '@/utils/emit';
const { Option } = Select;

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
		console.log(val);
		this.setState({ currentName: this.languageLabels[val] });
		emit.emit('change_language', val);
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
			<div>
				<Select defaultValue={this.languageLabels[this.initLocales]} style={{ width: 120 }} onChange={(e: any) => this.handleChange(e)}>
					{this.locales.map((res: any, index: number) => {
						return (
							<Option value={res} key={index}>
								{this.languageLabels[res]}
							</Option>
						);
					})}
				</Select>
			</div>
		);
	}
}

export default SelectLang;
