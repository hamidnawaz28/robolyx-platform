import React from 'react';
import { SERVER_URL } from '../../Global/constants';
import axios from 'axios';
import { defaultTempletesData, selecteDefaultTempletedata, savedTempletesData, selectedSavedTempletedata, mappingTempleteColumnSelected } from '../actions';
import { connect } from "react-redux";
class SelectOptions extends React.Component {
    render() {
        let selectedFieldValue = this.props.selOpt.fields.templeteName;
        let primeryKey = this.props.selOpt.pk;
        return <>
            <option value={selectedFieldValue} className="selectOption" key={primeryKey} data-options={primeryKey}>
                {selectedFieldValue}
            </option>
        </>
    }
}
class UploadSelectTempleteDD extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Lists: [], dataid: '-' };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        let selectedIndex = e.target.selectedIndex;
        let selectedNodeValue = e.target.value;
        let optionSelectedPK = e.target.options[selectedIndex].getAttribute("data-options");
        axios
            .get(SERVER_URL + "savedtempletes/", { params: { pk: optionSelectedPK } })
            .then(res => {

                this.props.savedTempletesData(res.data);
                this.props.selectedSavedTempletedata(res.data[0].pk, res.data[0].fields.SavedTempleteName, optionSelectedPK, res.data[0].fields.SavedTempleteColumns);

            }
            )
            .catch(err => console.log(err));
        let data;
        let AllSelectedDefaultTempleteData = this.props.data.defaultTempletesData;
        for (let singleData in AllSelectedDefaultTempleteData) {
            if (optionSelectedPK == AllSelectedDefaultTempleteData[singleData].pk) {
                data = AllSelectedDefaultTempleteData[singleData].fields.templeteItems;
            }
        }
        let initialSelection = JSON.parse(data);
        let dataSensitivityLevels = Object.keys(initialSelection).length
        if (dataSensitivityLevels >= 1) {
            let SelectionLevel = Object.keys(initialSelection)[0]
            let SensitivityFirstLayer = initialSelection[Object.keys(initialSelection)[0]];
            let dataTypesInFirstLayer = Object.keys(SensitivityFirstLayer).length
            if (dataTypesInFirstLayer >= 1) {
                let datatype = Object.keys(SensitivityFirstLayer)[0]
                let first_data = SensitivityFirstLayer[Object.keys(SensitivityFirstLayer)[0]];
                this.props.mappingTempleteColumnSelected(first_data[0], datatype, SelectionLevel)
            }
        }
        this.props.selecteDefaultTempletedata(optionSelectedPK, selectedNodeValue, data);
        this.setState({ dataid: optionSelectedPK });
    }
    componentDidMount() {
        axios
            .get(SERVER_URL + this.props.endPoint)
            .then(res => {
                this.props.defaultTempletesData(res.data)
                let initialPK = res.data[0].pk;
                let initialTempleteName = res.data[0].fields.templeteName;
                let data = res.data[0].fields.templeteItems;
                this.props.selecteDefaultTempletedata(initialPK, initialTempleteName, data)
                this.setState({ Lists: res.data, dataid: initialPK })
                let initialSelection = res.data[0].fields.templeteItems;
                initialSelection = JSON.parse(initialSelection);
                let dataSensitivityLevels = Object.keys(initialSelection).length
                if (dataSensitivityLevels >= 1) {
                    let SelectionLevel = Object.keys(initialSelection)[0]
                    let SensitivityFirstLayer = initialSelection[Object.keys(initialSelection)[0]];
                    let dataTypesInFirstLayer = Object.keys(SensitivityFirstLayer).length
                    if (dataTypesInFirstLayer >= 1) {
                        let datatype = Object.keys(SensitivityFirstLayer)[0]
                        let first_data = SensitivityFirstLayer[Object.keys(SensitivityFirstLayer)[0]];
                        this.props.mappingTempleteColumnSelected(first_data[0], datatype, SelectionLevel)
                    }
                }

                axios
                    .get(SERVER_URL + "savedtempletes/", { params: { pk: initialPK } })
                    .then(res => {

                        this.props.savedTempletesData(res.data);
                        this.props.selectedSavedTempletedata(res.data[0].pk, res.data[0].fields.SavedTempleteName, initialPK, res.data[0].fields.SavedTempleteColumns)


                    }
                    )
                    .catch(err => console.log(err));
            }
            )
            .catch(err => console.log(err));
    }

    render() {

        const Lists = this.state.Lists;
        const ListItems = Lists.map((ListItem) =>
            <SelectOptions selOpt={ListItem} />
        );

        return <>
            <select id={this.props.selectId} className={this.props.componentClassName} onChange={this.handleChange} data-selected-item={this.state.dataid}>
                {ListItems}
            </select>
        </>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selecteDefaultTempletedata: (key, value, data) => dispatch(selecteDefaultTempletedata(key, value, data)),
        defaultTempletesData: (e) => dispatch(defaultTempletesData(e)),
        savedTempletesData: (e) => dispatch(savedTempletesData(e)),
        selectedSavedTempletedata: (key, value, savedDefaultref, temData) => dispatch(selectedSavedTempletedata(key, value, savedDefaultref, temData)),
        mappingTempleteColumnSelected: (data, dataType, SelectionLevel) => dispatch(mappingTempleteColumnSelected(data, dataType, SelectionLevel))
    }
}
export default connect((state) => ({
    data: state.mapAndUploadStore
}), mapDispatchToProps)(UploadSelectTempleteDD)