import API from '..'

export function GetChecklist() {
  return API.get('/checklist/');
}
