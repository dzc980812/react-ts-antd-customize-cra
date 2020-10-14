import React, { PureComponent } from 'react';
import style from './HomeStyle.scss';
class Home extends PureComponent {
	render() {
		return (
			<div className={`homej ${style.home} `}>
				home <h1 className={style.home1}>2333</h1>
			</div>
		);
	}
}

export default Home;
