// basic tabel structure Header and accessor and for footer  is Footer


export const LISTODOUSERS = [
    {
        Header: 'ID', 
        accessor: 'id',
    },
    {
        Header : 'Name',
        accessor : 'contact_firstname',
    },
    {
        Header: 'Email', 
        accessor: 'contact_email',
    },
    {
        Header : 'Phone',
        accessor : 'contact_phone',
    },
    {
        Header: 'Created Date', 
        accessor: 'created',
    },
    {
        Header : 'Synced Media',
        accessor : 'synced_media',
    },
    {
        Header: 'Unsynced_Media ', 
        accessor: 'unsynced_media',
    },
    {
        Header : 'Updated Media',
        accessor : 'updates_media',
    },
   ]


   export const REGISTEREDMEDIA = [
    {
        Header: 'ID', 
        accessor: 'db_created',
      
    },
    {
        Header : 'Company',
        accessor : 'medianame',
    },
    {
        Header: 'Price', 
        accessor: 'price',
    },
    {
        Header : 'Description',
        accessor : 'areadescription',
    },
    {
        Header: 'Address', 
        accessor: 'searchingkeywords',
    },
    {
        Header : 'OFF',
        accessor : 'syncstatus',
    },
]
 

export const UNREGISTEREDMEDIA = [
    {
        Header: 'ID', 
        accessor: 'id',
    },
    {
        Header : 'Company',
        accessor : 'name',
    },
    {
        Header: 'Email', 
        accessor: 'contact_email',
    },
    {
        Header : 'Phone',
        accessor : 'contact_phone',
    },
    {
        Header: 'Created Date', 
        accessor: 'created',
    },
    {
        Header : 'Media',
        accessor : 'mediano',
    },
]

export const USERDATA = [
    {
        Header: 'ID', 
        accessor: 'id',
    },
    {
        Header : 'Name',
        accessor : 'firstname + lastname',
    },
    {
        Header: 'Email', 
        accessor: 'email',
    },
    {
        Header : 'UserID',
        accessor : 'userid',
    },
    {
        Header: 'Created Date', 
        accessor: 'created',
    },
    {
        Header : 'Media',
        accessor : 'mediano',
    },
]