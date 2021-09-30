const AdminBro = require('admin-bro'),
AdminBroExpress = require('@admin-bro/express'),
AdminBroMongoose = require('@admin-bro/mongoose'),
mongoose = require('mongoose');

let {User} = require('./schema');
let {Work} = require('./schema');
let {Admin} = require('./schema');

AdminBro.registerAdapter(AdminBroMongoose);

const contentParent = {
    name: 'content',
    icon: 'Accessibility',
  }

let adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        logo: 'https://stat.uz/images/uzstat.png',
        companyName: 'Stat Project'
    },
    resources: [
        { resource: User,
            options: { 
                parent: contentParent
            }
        },
        { resource: Work,
            options: { 
                parent: contentParent
            }
        },
        { resource: Admin,
            options: { 
                parent: contentParent
            },
        },
      ],
    softwareBrothers: false,

});

const routerAdm = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    authenticate: async (email, password) => {
        const admin = await Admin.findOne({email: email, password: password})
        if (admin) {
            return true;
        } else {
            return false;
        }
      },
      cookiePassword: 'some-secret-password-used-to-secure-cookie',
});

module.exports = routerAdm;