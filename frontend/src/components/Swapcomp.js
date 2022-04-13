import React from "react";

import { Button, Select } from 'antd';
import { Input } from 'antd';

const { Option } = Select;

class Swapcomp extends React.Component {
    render() {
        return (
            <div>
                <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                    style={{ width: 120 }}
                >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                </Select>
                <Input placeholder="Enter value" />

                <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                    style={{ width: 120 }}
                >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                </Select>
                <Input placeholder="Enter value" />

                <Button type="primary">SWAP</Button>

            </div>
        );
    }
}

export default Swapcomp;