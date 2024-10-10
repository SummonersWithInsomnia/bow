/*
Local Storage Helpers

lsh.initAllDatasets() : void
    - Warning: Please do not access the datasets directly. -
    The function is for the initialization of all datasets of local storage.
    If a dataset of local storage already exist in browser, the function will not overwrite the dataset.
    The function does not check the data correctness of dataset.
    It can be called at anywhere in the frontend.
*/

/*
Unified Data Connection

UDC offers five methods:
    udc.get(path, token, obj) : Promise
    udc.post(path, token, obj) : Promise
    udc.put(path, token, obj) : Promise
    udc.delete(path, token, obj) : Promise
    udc.patch(path, token, obj) : Promise

*/