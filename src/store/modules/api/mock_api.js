/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
let domain = ''
export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axios[method](queryUrl, body, config)
  } else if (method === 'get') {
    return axios[method](queryUrl, {
      params: form
    }, config)
  } else {
    return axios[method](queryUrl, qs.stringify(form), config)
  }
}
/*==========================================================
 *                    
 ==========================================================*/
/**
 * API root. Returns JSON Object of Metadata and available Entities
 * request: get
 * url: getURL
 * method: get_TYPE
 * raw_url: get_RAW_URL
 */
export const get = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const get_RAW_URL = function() {
  return '/'
}
export const get_TYPE = function() {
  return 'get'
}
export const getURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Login to the application
 * request: postLogin
 * url: postLoginURL
 * method: postLogin_TYPE
 * raw_url: postLogin_RAW_URL
 * @param user - Login Data.
 */
export const postLogin = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/login'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['user'] !== undefined) {
    body = parameters['user']
  }
  if (parameters['user'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: user'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postLogin_RAW_URL = function() {
  return '/login'
}
export const postLogin_TYPE = function() {
  return 'post'
}
export const postLoginURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/login'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Logout of the application
 * request: getLogout
 * url: getLogoutURL
 * method: getLogout_TYPE
 * raw_url: getLogout_RAW_URL
 */
export const getLogout = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/logout'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getLogout_RAW_URL = function() {
  return '/logout'
}
export const getLogout_TYPE = function() {
  return 'get'
}
export const getLogoutURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/logout'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * New User Registration
 * request: postRegister
 * url: postRegisterURL
 * method: postRegister_TYPE
 * raw_url: postRegister_RAW_URL
 * @param user - Login Data.
 */
export const postRegister = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/register'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['user'] !== undefined) {
    body = parameters['user']
  }
  if (parameters['user'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: user'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postRegister_RAW_URL = function() {
  return '/register'
}
export const postRegister_TYPE = function() {
  return 'post'
}
export const postRegisterURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/register'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Serves an Entities JSONSchema by Name
 * request: getJsonschemaByName
 * url: getJsonschemaByNameURL
 * method: getJsonschemaByName_TYPE
 * raw_url: getJsonschemaByName_RAW_URL
 * @param name - Schema Name.
 */
export const getJsonschemaByName = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/jsonschema/{name}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters['name'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: name'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getJsonschemaByName_RAW_URL = function() {
  return '/jsonschema/{name}'
}
export const getJsonschemaByName_TYPE = function() {
  return 'get'
}
export const getJsonschemaByNameURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/jsonschema/{name}'
  path = path.replace('{name}', `${parameters['name']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Retrieves Image and returns corresponding AssetRef
 * request: postUpload
 * url: postUploadURL
 * method: postUpload_TYPE
 * raw_url: postUpload_RAW_URL
 * @param image - File Object from upload.
 */
export const postUpload = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/upload/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['image'] !== undefined) {
    form['image'] = parameters['image']
  }
  if (parameters['image'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: image'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postUpload_RAW_URL = function() {
  return '/upload/'
}
export const postUpload_TYPE = function() {
  return 'post'
}
export const postUploadURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/upload/'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Outputs all currently available import Jobs
 * request: getImport
 * url: getImportURL
 * method: getImport_TYPE
 * raw_url: getImport_RAW_URL
 */
export const getImport = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/import/'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getImport_RAW_URL = function() {
  return '/import/'
}
export const getImport_TYPE = function() {
  return 'get'
}
export const getImportURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/import/'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Returns the number of documents of type entity
 * request: getEntityCount
 * url: getEntityCountURL
 * method: getEntityCount_TYPE
 * raw_url: getEntityCount_RAW_URL
 */
export const getEntityCount = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity/count'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getEntityCount_RAW_URL = function() {
  return '/entity/count'
}
export const getEntityCount_TYPE = function() {
  return 'get'
}
export const getEntityCountURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity/count'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Returns a List of entitys
 * request: getEntity
 * url: getEntityURL
 * method: getEntity_TYPE
 * raw_url: getEntity_RAW_URL
 * @param sort - Key Name to Sort by, preceded by '-' for descending, default: _id
 * @param skip - Number of records to skip from start, default: 0
 * @param limit - Number of records to return, default: 10
 * @param query - MongoDB Query as a well formed JSON String, ie {"name":"Bob"}
 * @param populate - Path to a MongoDB reference to populate, ie [{"path":"customer"},{"path":"products"}]
 */
export const getEntity = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    queryParameters['query'] = parameters['query']
  }
  if (parameters['populate'] !== undefined) {
    queryParameters['populate'] = parameters['populate']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getEntity_RAW_URL = function() {
  return '/entity'
}
export const getEntity_TYPE = function() {
  return 'get'
}
export const getEntityURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    queryParameters['query'] = parameters['query']
  }
  if (parameters['populate'] !== undefined) {
    queryParameters['populate'] = parameters['populate']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Creates a new instance of entity
 * request: postEntity
 * url: postEntityURL
 * method: postEntity_TYPE
 * raw_url: postEntity_RAW_URL
 * @param entity - 
 */
export const postEntity = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['entity'] !== undefined) {
    body = parameters['entity']
  }
  if (parameters['entity'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: entity'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postEntity_RAW_URL = function() {
  return '/entity'
}
export const postEntity_TYPE = function() {
  return 'post'
}
export const postEntityURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Deletes the entire contents of collection entity
 * request: deleteEntity
 * url: deleteEntityURL
 * method: deleteEntity_TYPE
 * raw_url: deleteEntity_RAW_URL
 */
export const deleteEntity = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteEntity_RAW_URL = function() {
  return '/entity'
}
export const deleteEntity_TYPE = function() {
  return 'delete'
}
export const deleteEntityURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Returns a List of entitys
 * request: getEntityById
 * url: getEntityByIdURL
 * method: getEntityById_TYPE
 * raw_url: getEntityById_RAW_URL
 * @param id - MongoDB document _id
 */
export const getEntityById = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getEntityById_RAW_URL = function() {
  return '/entity/{id}'
}
export const getEntityById_TYPE = function() {
  return 'get'
}
export const getEntityByIdURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Updates the document with the given ID
 * request: postEntityById
 * url: postEntityByIdURL
 * method: postEntityById_TYPE
 * raw_url: postEntityById_RAW_URL
 * @param id - MongoDB document _id
 * @param entity - 
 */
export const postEntityById = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['entity'] !== undefined) {
    body = parameters['entity']
  }
  if (parameters['entity'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: entity'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postEntityById_RAW_URL = function() {
  return '/entity/{id}'
}
export const postEntityById_TYPE = function() {
  return 'post'
}
export const postEntityByIdURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Deletes the document with the given ID
 * request: deleteEntityById
 * url: deleteEntityByIdURL
 * method: deleteEntityById_TYPE
 * raw_url: deleteEntityById_RAW_URL
 * @param id - MongoDB document _id
 */
export const deleteEntityById = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/entity/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteEntityById_RAW_URL = function() {
  return '/entity/{id}'
}
export const deleteEntityById_TYPE = function() {
  return 'delete'
}
export const deleteEntityByIdURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/entity/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Returns the number of documents of type relation
 * request: getRelationCount
 * url: getRelationCountURL
 * method: getRelationCount_TYPE
 * raw_url: getRelationCount_RAW_URL
 */
export const getRelationCount = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation/count'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getRelationCount_RAW_URL = function() {
  return '/relation/count'
}
export const getRelationCount_TYPE = function() {
  return 'get'
}
export const getRelationCountURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation/count'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Returns a List of relations
 * request: getRelation
 * url: getRelationURL
 * method: getRelation_TYPE
 * raw_url: getRelation_RAW_URL
 * @param sort - Key Name to Sort by, preceded by '-' for descending, default: _id
 * @param skip - Number of records to skip from start, default: 0
 * @param limit - Number of records to return, default: 10
 * @param query - MongoDB Query as a well formed JSON String, ie {"name":"Bob"}
 * @param populate - Path to a MongoDB reference to populate, ie [{"path":"customer"},{"path":"products"}]
 */
export const getRelation = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    queryParameters['query'] = parameters['query']
  }
  if (parameters['populate'] !== undefined) {
    queryParameters['populate'] = parameters['populate']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getRelation_RAW_URL = function() {
  return '/relation'
}
export const getRelation_TYPE = function() {
  return 'get'
}
export const getRelationURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation'
  if (parameters['sort'] !== undefined) {
    queryParameters['sort'] = parameters['sort']
  }
  if (parameters['skip'] !== undefined) {
    queryParameters['skip'] = parameters['skip']
  }
  if (parameters['limit'] !== undefined) {
    queryParameters['limit'] = parameters['limit']
  }
  if (parameters['query'] !== undefined) {
    queryParameters['query'] = parameters['query']
  }
  if (parameters['populate'] !== undefined) {
    queryParameters['populate'] = parameters['populate']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Creates a new instance of relation
 * request: postRelation
 * url: postRelationURL
 * method: postRelation_TYPE
 * raw_url: postRelation_RAW_URL
 * @param relation - 
 */
export const postRelation = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['relation'] !== undefined) {
    body = parameters['relation']
  }
  if (parameters['relation'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: relation'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postRelation_RAW_URL = function() {
  return '/relation'
}
export const postRelation_TYPE = function() {
  return 'post'
}
export const postRelationURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Deletes the entire contents of collection relation
 * request: deleteRelation
 * url: deleteRelationURL
 * method: deleteRelation_TYPE
 * raw_url: deleteRelation_RAW_URL
 */
export const deleteRelation = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteRelation_RAW_URL = function() {
  return '/relation'
}
export const deleteRelation_TYPE = function() {
  return 'delete'
}
export const deleteRelationURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Returns a List of relations
 * request: getRelationById
 * url: getRelationByIdURL
 * method: getRelationById_TYPE
 * raw_url: getRelationById_RAW_URL
 * @param id - MongoDB document _id
 */
export const getRelationById = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getRelationById_RAW_URL = function() {
  return '/relation/{id}'
}
export const getRelationById_TYPE = function() {
  return 'get'
}
export const getRelationByIdURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Updates the document with the given ID
 * request: postRelationById
 * url: postRelationByIdURL
 * method: postRelationById_TYPE
 * raw_url: postRelationById_RAW_URL
 * @param id - MongoDB document _id
 * @param relation - 
 */
export const postRelationById = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['relation'] !== undefined) {
    body = parameters['relation']
  }
  if (parameters['relation'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: relation'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postRelationById_RAW_URL = function() {
  return '/relation/{id}'
}
export const postRelationById_TYPE = function() {
  return 'post'
}
export const postRelationByIdURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Deletes the document with the given ID
 * request: deleteRelationById
 * url: deleteRelationByIdURL
 * method: deleteRelationById_TYPE
 * raw_url: deleteRelationById_RAW_URL
 * @param id - MongoDB document _id
 */
export const deleteRelationById = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config
  let path = '/relation/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', domain + path, body, queryParameters, form, config)
}
export const deleteRelationById_RAW_URL = function() {
  return '/relation/{id}'
}
export const deleteRelationById_TYPE = function() {
  return 'delete'
}
export const deleteRelationByIdURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/relation/{id}'
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}