import * as React from "react";
import {TreeViewComponent} from "@syncfusion/ej2-react-navigations";
import {connect} from "react-redux";

export class CCategoryEditTree extends React.Component {
    constructor(category, onGetCategory) {
        super(...arguments);
        this.category = category
        this.productTeam = [
            {
                id: 1, name: 'ASP.NET MVC Team',
                child: [
                    { id: 2, pid: 1, name: 'Smith'},
                    { id: 3, pid: 1, name: 'Johnson'},
                    { id: 4, pid: 1, name: 'Anderson' },
                ]
            },
            {
                id: 5, name: 'Windows Team',
                child: [
                    { id: 6, pid: 5, name: 'Clark' },
                    { id: 7, pid: 5, name: 'Wright' },
                    { id: 8, pid: 5, name: 'Lopez' },
                ]
            },
            {
                id: 9, name: 'Web Team',
                child: [
                    { id: 11, pid: 9, name: 'Joshua' },
                    { id: 12, pid: 9, name: 'Matthew' },
                    { id: 13, pid: 9, name: 'David' },
                ]
            },
            {
                id: 14, name: 'Build Team',
                child: [
                    { id: 15, pid: 14, name: 'Ryan' },
                    { id: 16, pid: 14, name: 'Justin' },
                    { id: 17, pid: 14, name: 'Robert' },
                ]
            },
            {
                id: 18, name: 'WPF Team',
                child: [
                    { id: 19, pid: 18, name: 'Brown' },
                    { id: 20, pid: 18, name: 'Johnson' },
                    { id: 21, pid: 18, name: 'Miller' },
                ]
            }
        ];
        this.fields = {
            dataSource: this.productTeam,
            id: 'id',
            parentID: 'pid',
            text: 'name',
            hasChildren: 'hasChild',
            selected: 'isSelected'
        };
        this.allowDragAndDrop = true;
        this.allowMultiSelection = true;
    }

    render() {
        return (
            <TreeViewComponent fields={this.fields} allowMultiSelection={this.allowMultiSelection} allowDragAndDrop={this.allowDragAndDrop}/>
        );
    }
}
export const CCCategoryEditTree = connect(state => ({
    category: state.category})
)(CCategoryEditTree)
