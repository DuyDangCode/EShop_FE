const convertArrObject2ArrString = (arrObject: Array<Object>): Array<any> => {
  return arrObject.map((item: any) => item.label)
}

export { convertArrObject2ArrString }
