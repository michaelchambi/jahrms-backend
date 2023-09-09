require("dotenv").config({ path: "./app/.env" });
const db = require("../../models");
const app_modules = db.app_modules;
const app_sub_modules = db.app_sub_modules;
const app_sub_module_action = db.app_sub_module_action;
const app_module_permission = db.app_module_permission;
const app_sub_module_permission = db.app_sub_module_permission;
const app_action_permission = db.app_action_permission;
const role_user = db.role_user;
const roles = db.roles;
const Op = db.Sequelize.Op;
var moduleList = [];

exports.permissions = (req, res) => {
  app_modules
    .findAll({
      include: [
        {
          model: app_sub_modules,
          include: {
            model: app_sub_module_action,
            order: [["name", "ASC"]],
          },
        },
      ],
    })
    .then((data) => {
      res.status(200).json({
        en_message: " Permission successful found",
        sw_message: " Ruhusa za mfumo zimepatikana",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: "Something went wrong, Kindly try again",
        sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
      });
    });
};

exports.rolePermissions = (req, res) => {
  const roleId = req.body.role_id;
  app_modules
    .findAll({
      include: [
        {
          model: app_module_permission,
          where: {
            role_id: roleId,
          },
        },
        {
          model: app_sub_modules,
          include: [
            {
              model: app_sub_module_permission,
              where: {
                role_id: roleId,
              },
            },
            
          ],
        },
        {
          model: app_sub_module_action,
          include: {
            model: app_action_permission,
            where: {
              role_id: roleId,
            },
          },
        },
      ],
    })
    .then((data) => {
      const module = [];
      const submodule = [];
      const action = [];
      const datacheck =[]

      for (const key in data) {
        const module_permission = data[key].app_module_permissions;
        const submodule_data = data[key].app_sub_modules;
        const action_data = data[key].app_sub_module_actions;
 
        

        for (const value in module_permission) {
          const element = module_permission[value];
          if (element.permission) {
            module.push({
              module_id: element.module_id,
              name: data[key].name,
              linkName: data[key].linkName,
              checked: true,
            });
          } else {
            module.push({
              module_id: element.module_id,
              name: data[key].name,
              linkName: data[key].linkName,
            });
          }
        }

      


        for (const value in submodule_data) {
            const submule_permission =
              submodule_data[value].app_sub_module_permissions;
  
            for (const result in submule_permission) {
              const sub_element = submule_permission[result];
  
              if (sub_element.permission) {
                submodule.push({
                  module_id: submodule_data[value].module_id,
                  name: submodule_data[value].name,
                  sub_module_id: sub_element.sub_module_id,
                  checked: true,
                });
              } else {
                submodule.push({
                  module_id: submodule_data[value].module_id,
                  name: submodule_data[value].name,
                  sub_module_id: sub_element.sub_module_id,
                });
              }
            }
          }

        for (const series in action_data) {
            const action_permission = action_data[series].app_action_permissions;
  
            for (const action_key in action_permission) {
              const action_element = action_permission[action_key];
              if (action_element.permission) {
                action.push({
                  action_id: action_element.action_id,
                  name: action_data[series].name,
                  sub_module_id: action_data[series].sub_module_id,
                  checked: true,
                });
              } else {
                action.push({
                  action_id: action_element.action_id,
                  name: action_data[series].name,
                  sub_module_id: action_data[series].sub_module_id,
                });
              }
            }
          }



          

         
      }

      // return res.status(200).json(data);
      // res.status(200).json({
      // data: {
      // module: module,
      // submule: submule,
      // action: action,
      // },
      // });
     
      res.status(200).json({
        
        en_message: " Permission successful found",
        sw_message: " Ruhusa za mfumo zimepatikana kikamilifu",
        data: {
          module: module,
          submule: submodule,
          action: action,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: err + "Something went wrong, Kindly try again",
        sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
      });
    });
};

exports.activePermissions = (req, res) => {
  const roleId = req.body.roleId;
  app_modules
    .findAll({
      include: [
        {
          model: app_module_permission,
          where: {
            role_id: roleId,
            permission: true,
          },
        },
        {
          model: app_sub_modules,
          include: [
            {
              model: app_sub_module_permission,
              where: {
                role_id: roleId,
                permission: true,
              },
            },
          ],
        },
        {
          model: app_sub_module_action,
          include: {
            model: app_action_permission,
            where: {
              role_id: roleId,
              permission: true,
            },
          },
        },
      ],
    })
    .then((data) => {
      const module = [];
      const submodule = [];
      const action = [];

      for (const key in data) {
        const module_data = data[key];

        module.push({ module_id: module_data.id });
      }

      
      for (const key in data) {
        const submodule_data = data[key].app_sub_modules;

        for (const value in submodule_data) {
          const submodule_element = submodule_data[value];
          submodule.push({ sub_module_id: submodule_element.id });
        }
      }

      for (const key in data) {
        const action_data = data[key].app_sub_module_actions;

        for (const action_key in action_data) {
          const action_element = action_data[action_key];
          action.push({ action_id: action_element.id });
        }
      }

      // return res.status(200).json(data);
      // return res.status(200).json({
      // data: {
      // module: module,
      // submodule: submodule,
      // action: action,
      // },
      // });

      res.status(200).json({
        en_message: " Permission successful found",
        sw_message: " Ruhusa za mfumo zimepatikana kikamilifu",
        data: {
          module: module,
          submodule: submodule,
          action: action,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: "Something went wrong, Kindly try again",
        sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
      });
    });
};

exports.showModulePermissions = (req, res) => {
  const userId = req.body.userId;
  role_user
    .findAll({
      where: {
        userId: userId,
      },
    })
    .then((user) => {
      const userRoles = [];
      const modules_ids = [];

      for (const key in user) {
        const element = user[key].role_id;
        userRoles.push(element);
      }

      app_module_permission
        .aggregate("module_id", "DISTINCT", {
          plain: false,
          where: {
            role_id: {
              [Op.or]: userRoles,
            },
            permission: true,
          },
        })
        .then((data) => {
          for (const val in data) {
            const element = data[val].DISTINCT;
            modules_ids.push(element);
          }

          app_modules
            .findAll({
              where: {
                id: {
                  [Op.in]: modules_ids,
                },
              },
              attributes: [
                "id",
                "name",
                "icon",
                "linkName",
                "display_option",
                "active",
              ],
            })
            .then((modules) => {
              res.status(200).json({
                en_message: "Module Permission found",
                sw_message: " Ruhusa za mfumo zimepatikana kikamilifu",
                data: modules,
              });
            })
            .catch((err) => {
              res.status(500).json({
                en_message: "Fail to identify modules",
                sw_message: "Imeshindwa kutambua module",
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            en_message: "Something went wrong, Kindly try again",
            sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: "User not found",
        sw_message: "Mtumiaji hatumbuliki",
      });
    });
};

exports.showSubPermissions = (req, res) => {
  const userId = req.body.userId;

  role_user
    .findAll({
      where: {
        userId: userId,
      },
    })
    .then((user) => {
      const userRoles = [];
      const submodules_ids = [];

      for (const key in user) {
        const element = user[key].role_id;
        userRoles.push(element);
      }
      app_sub_module_permission
        .aggregate("sub_module_id", "DISTINCT", {
          plain: false,
          where: {
            role_id: {
              [Op.or]: userRoles,
            },
            permission: true,
          },
        })
        .then((data) => {
          for (const val in data) {
            const element = data[val].DISTINCT;
            submodules_ids.push(element);
          }

          app_sub_modules
            .findAll({
              where: {
                id: {
                  [Op.in]: submodules_ids,
                },
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            })
            .then((submodules) => {
              res.status(200).json({
                en_message: "Submodule Permission found",
                sw_message: " Ruhusa za mfumo zimepatikana kikamilifu",
                data: submodules,
              });
            })
            .catch((err) => {
              res.status(500).json({
                en_message: res.err + "Fail to identify modules",
                sw_message: "Imeshindwa kutambua module",
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            en_message: res.err + "Fail to identify sub-modules",
            sw_message: "Imeshindwa kutambua module ndogo",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: res.err + "Something went wrong, Kindly try again",
        sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
      });
    });
};

exports.showActionPermissions = (req, res) => {
  const userId = req.body.userId;

  role_user
    .findAll({
      where: {
        userId: userId,
      },
    })
    .then((user) => {
      const userRoles = [];
      const action_ids = [];

      for (const key in user) {
        const element = user[key].role_id;
        userRoles.push(element);
      }

      app_action_permission
        .aggregate("action_id", "DISTINCT", {
          plain: false,
          where: {
            role_id: {
              [Op.or]: userRoles,
            },
            permission: true,
          },
        })
        .then((data) => {
          // return res.status(200).json(data);
          const access = [];
          for (const val in data) {
            const element = data[val].DISTINCT;
            action_ids.push(element);
          }
          app_sub_module_action
            .findAll({
              where: {
                id: {
                  [Op.in]: action_ids,
                },
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            })
            .then((actions) => {
              for (const item in actions) {
                const element = actions[item].name;
                access.push(element);
              }

              res.status(200).json({
                en_message: "Sub module action Permission found",
                sw_message: " Ruhusa za mfumo zimepatikana kikamilifu",
                data: access,
              });
            })
            .catch((err) => {
              res.status(500).json({
                en_message: "Fail to identify sub-module actions",
                sw_message: "Imeshindwa kutambua vitendo vya module ndogo",
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            en_message: "Fail to identify sub-module action permission",
            sw_message:
              "Imeshindwa kutambua ruhusa za vitendo vya module ndogo",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: "Something went wrong, Kindly try again",
        sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
      });
    });
};

exports.updatePermissions = (req, res) => {
  const role = req.body.roleId;
  const module = req.body.moduleId;
  const submodule = req.body.sub_moduleId;
  const action = req.body.actionId;

  app_modules
    .findAll()
    .then((data) => {
      for (const key in data) {
        if (module.indexOf(data[key].id) !== -1) {
          app_module_permission.update(
            {
              permission: true,
            },
            {
              where: {
                module_id: data[key].id,
                role_id: role,
              },
            }
          );
        } else {
          app_module_permission.update(
            {
              permission: false,
            },
            {
              where: {
                module_id: data[key].id,
                role_id: role,
              },
            }
          );
        }
      }
    })
    .then(() => {
      app_sub_modules
        .findAll()
        .then((result) => {
          for (const key in result) {
            if (submodule.indexOf(result[key].id) !== -1) {
              app_sub_module_permission.update(
                {
                  permission: true,
                },
                {
                  where: {
                    sub_module_id: result[key].id,
                    role_id: role,
                  },
                }
              );
            } else {
              app_sub_module_permission.update(
                {
                  permission: false,
                },
                {
                  where: {
                    sub_module_id: result[key].id,
                    role_id: role,
                  },
                }
              );
            }
          }
        })
        .catch((err) => {
          res.status(500).json({
            en_message: "Fail to update sub module permissions",
            sw_message: "Imeshindwa kubadili ruhusa za module ndogo",
          });
        });
    })
    .then(() => {
      app_sub_module_action
        .findAll()
        .then((sub_action) => {
          for (const key in sub_action) {
            if (action.indexOf(sub_action[key].id) !== -1) {
              app_action_permission.update(
                {
                  permission: true,
                },
                {
                  where: {
                    action_id: sub_action[key].id,
                    role_id: role,
                  },
                }
              );
            } else {
              app_action_permission.update(
                {
                  permission: false,
                },
                {
                  where: {
                    action_id: sub_action[key].id,
                    role_id: role,
                  },
                }
              );
            }
          }
        })
        .then((updated) => {
          res.status(200).json({
            en_message: "Permissions Successful updated",
            sw_message: "Ruhusa zimewekwa kikamilifu",
          });
        })
        .catch((err) => {
          res.status(500).json({
            en_message: "Fail to update sub module action permissions",
            sw_message:
              "Imeshindwa kubadili ruhusa za vitendo vya module ndogo",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        en_message: "Something went wrong, Kindly try again",
        sw_message: "Kuna kitu hakipo sawa, Jaribu tena baadae",
      });
    });
};
