export const adminListColumns = () => {
  return [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'companyName', label: 'Company Name' },
    { id: 'contactNumber', label: 'Contact Number' },
    { id: 'userGroup', label: 'User Group' }
  ];
};

export const adminUserGroup = () => {
  return [
    { name: 'Admin', value: 'admin' },
    { name: 'Senior Manager', value: 'seniorManager' },
    { name: 'Manager', value: 'manager' },
    { name: 'Specilist', value: 'specilist' },
    { name: 'Viewer', value: 'viewer' },
    { name: 'User', value: 'user' }
  ];
}
