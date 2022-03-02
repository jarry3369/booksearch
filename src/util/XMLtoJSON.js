import XMLParser from 'react-xml-parser'

export default function parseToJson(dataSet) {
    console.log(dataSet);
    var dataArr = new XMLParser().parseFromString(dataSet.data).children;
    return dataArr;
};