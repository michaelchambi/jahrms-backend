require("dotenv").config({path: "./app/.env"});
const fs = require("fs");
const db = require("../models");
const uuid = require("uuid");
const users = db.users;
const user_profile = db.api_staff_profile;
const designation = db.api_designation;
const cfg_roles = db.roles;
const cfg_user_roles = db.role_user;
const app_module = db.app_modules;
const app_module_permissions = db.app_module_permission
const app_submodule = db.app_sub_modules;
const app_submodule_item = db.app_submodule_item;
const app_sub_module_permissions = db.app_sub_module_permission;
const app_action = db.app_sub_module_action;
const app_item_action = db.app_sub_module_item_action;
const app_action_permission = db.app_action_permission;
const app_sub_module_item_permissions = db.app_sub_module_item_permission;
const today = new Date();
const newDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
const firstname = "Michael";
const lastname = "Chambi"

// submodule_id

module.exports = {
    create_directory(path) {
        try {
            if (! fs.existsSync(path)) {
                fs.mkdirSync(path, {recursive: true});
            }
        } catch (err) {
            throw new Error("Failed to create directory");
        }
    },
    initial_values() {
        users.findOne({
            where: {
                email: "michael.chambi@judiciary.go.tz"
            }
        }).then((check) => {
            if (!check) {
                cfg_roles.create({name: "Super Admin", modal_name: "Configurations", active: true}).then((role_result) => {
                    users.create({
                        uid: uuid.v4(),
                        first_name: firstname,
                        middle_name: lastname,
                        last_name: "Chambi",
                        name: firstname + " " + lastname,
                        email: "michael.chambi@judiciary.go.tz",
                        phone_number: "0714923586",
                        national_id: "100000000000000000",
                        sex: "male",
                        password_expiration_date: newDate,
                        account_non_locked: false,
                        credential_non_expired: false,
                        number_of_attempt: 0,
                        isStaff: true,
                        first_login: false,
                        active: true,
                        password: "$2a$08$S18mN6Xtskm0A1NKrdfC2.Wjauxc8dUw3uxE1CSABhNOlHNJnZgV2" // password
                    }).then((data) => {
                        designation.create({name: "Super Admin", status: true}).then((info) => { // return console.log('user id niliyopokea ni ',data,info);
                            user_profile.create({userId: data.id, court_id: 40, designationId: info.id}).then((roleData) => {
                                cfg_user_roles.create({userId: data.id, role_id: role_result.id})
                            })

                        })

                    })

                })


            }
        })


    },


    moduleData() {
        app_module.create({
            uid: uuid.v4(),
            name: "Configurations",
            icon: "fal fa-cogs",
            linkName: "Configurations",
            active: true
        }).then((data) => {
            app_module_permissions.create({permission: true, module_id: data.id, role_id: 1}).then((module_permission_results) => {
                // ================================================================
                // 1: Module, Submodule and Actions
                // ================================================================
                app_submodule.create({
                    uid: uuid.v4(),
                    name: "Modules",
                    link: "modules",
                    icon: "fad fa-th",
                    linkName: "Modules",
                    active: true,
                    module_id: data.id
                }).then((submodule) => {
                    app_sub_module_permissions.create({permission: true, sub_module_id: submodule.id, role_id: 1}).then(() => {
                        app_action.create({
                            uid: uuid.v4(),
                            name: "view-modules-list",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({permission: true, action_id: action.id, role_id: 1})
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "add-modules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({permission: true, action_id: action.id, role_id: 1})
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "edit-modules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                        app_action.create({
                            uid: uuid.v4(),
                            name: "activate-modules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                        app_action.create({
                            uid: uuid.v4(),
                            name: "deactivate-modules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "show-modules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "view-submodules-list",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "add-submodules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                        app_action.create({
                            uid: uuid.v4(),
                            name: "edit-submodules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "activate-submodules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "deactivate-submodules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "show-submodules",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "view-submodule-actions-list",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });
                        app_action.create({
                            uid: uuid.v4(),
                            name: "add-submodule-actions",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                        app_action.create({
                            uid: uuid.v4(),
                            name: "edit-submodule-actions",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                        app_action.create({
                            uid: uuid.v4(),
                            name: "activate-submodule-actions",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                        app_action.create({
                            uid: uuid.v4(),
                            name: "deactivate-submodule-actions",
                            active: true,
                            module_id: data.id,
                            sub_module_id: submodule.id
                        }).then((action) => {
                            app_action_permission.create({
                                permission: "true",
                                action_id: action.id,
                                sub_module_id: submodule.id,
                                module_id: data.id,
                                role_id: 1
                            })
                        });

                    })
                }).then(() => {
                    // ================================================================
                    // 2: Roles
                    // ================================================================
                    app_submodule.create({
                        uid: uuid.v4(),
                        name: "Roles",
                        link: "roles",
                        icon: "fal fa-user-tag",
                        linkName: "Roles",
                        active: true,
                        module_id: data.id
                    }).then((submodule) => {
                        app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                            app_action.create({
                                uid: uuid.v4(),
                                name: "view-roles-list",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                            app_action.create({
                                uid: uuid.v4(),
                                name: "add-roles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                            // ==============================

                            app_action.create({
                                uid: uuid.v4(),
                                name: "edit-roles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "activate-roles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "deactivate-roles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "update-role-permissions",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                        })
                    });
                }).then(() => {
                    // ================================================================
                    // 3: Users
                    // ================================================================
                    app_submodule.create({
                        uid: uuid.v4(),
                        name: "Users",
                        link: "view-users",
                        icon: "fal fa-users",
                        linkName: "Users",
                        active: true,
                        module_id: data.id
                    }).then((submodule) => {
                        app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                            app_action.create({
                                uid: uuid.v4(),
                                name: "view-users-list",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                            app_action.create({
                                uid: uuid.v4(),
                                name: "add-users",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "edit-users",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "activate-users",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "deactivate-users",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "reset-passwords",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                        })
                    });
                }).then(() => {
                    // ================================================================
                    // 4; Profile
                    // ================================================================
                    app_submodule.create({
                        uid: uuid.v4(),
                        name: "Profiles",
                        link: "profile",
                        icon: "fal fa-user-tag",
                        linkName: "Profile",
                        active: true,
                        module_id: data.id
                    }).then((submodule) => {
                        app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                            app_action.create({
                                uid: uuid.v4(),
                                name: "view-profiles-list",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                            app_action.create({
                                uid: uuid.v4(),
                                name: "add-profiles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "edit-profiles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "activate-profiles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "deactivate-profiles",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                        })
                    });
                }).then(() => {
                    // ================================================================
                    // 5: Settings
                    // ================================================================
                    app_submodule.create({
                        uid: uuid.v4(),
                        name: "Settings",
                        link: "roles",
                        icon: "fal fa-tools",
                        linkName: "Settings",
                        active: true,
                        module_id: data.id
                    }).then((submodule) => {
                        app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                            app_action.create({
                                uid: uuid.v4(),
                                name: "view-configurations-list",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                            app_action.create({
                                uid: uuid.v4(),
                                name: "add-configurations",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "edit-configurations",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "activate-configurations",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "deactivate-configurations",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                        })
                    });
                }).then(() => {
                    // ================================================================
                    // 6: Source of Fund
                    // ================================================================
                    app_submodule.create({
                        uid: uuid.v4(),
                        name: "Designations",
                        link: "designation",
                        icon: "fal fa-sack",
                        linkName: "designation",
                        active: true,
                        module_id: data.id
                    }).then((submodule) => {
                        app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                            app_action.create({
                                uid: uuid.v4(),
                                name: "view-designation-list",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });
                            app_action.create({
                                uid: uuid.v4(),
                                name: "add-designation",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "edit-designation",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "activate-designation",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                            app_action.create({
                                uid: uuid.v4(),
                                name: "deactivate-designation",
                                active: true,
                                module_id: data.id,
                                sub_module_id: submodule.id
                            }).then((action) => {
                                app_action_permission.create({
                                    permission: "true",
                                    action_id: action.id,
                                    sub_module_id: submodule.id,
                                    module_id: data.id,
                                    role_id: 1
                                })
                            });

                        })
                        // submodule item
                        app_submodule_item.create({
                            uid: uuid.v4(),
                            name: "Personal info",
                            linkName: "personal-info",
                            active: true,
                            module_id:data.id,
                            submodule_id: submodule.id
                        }).then((submodule_item) => {
                            app_sub_module_item_permissions.create({permission: true, sub_module_item_id: submodule_item.id, role_id: 1}).then(() => {
                                app_item_action.create({
                                    uid: uuid.v4(),
                                    name: "view-sub-modules-item-list",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id,
                                    sub_module_item_id: submodule_item.id
                                }).then((action) => {
                                    app_action_permission.create({permission: true, action_id: action.id, role_id: 1})
                                });
                                app_item_action.create({
                                    uid: uuid.v4(),
                                    name: "add-sub-modules-item",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id,
                                    sub_module_item_id: submodule_item.id
                                }).then((action) => {
                                    app_action_permission.create({permission: true, action_id: action.id, role_id: 1})
                                });
                                app_item_action.create({
                                    uid: uuid.v4(),
                                    name: "edit-sub-modules-item",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id,
                                    sub_module_item_id: submodule_item.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_item_id: submodule_item.id,
                                        sub_module_id:submodule.id,
                                        role_id: 1
                                    })
                                });

                                app_item_action.create({
                                    uid: uuid.v4(),
                                    name: "activate-sub-modules-item",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id,
                                    sub_module_item_id: submodule_item.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_item_id: submodule_item.id,
                                        sub_module_id:submodule.id,
                                        role_id: 1
                                    })
                                });

                                app_item_action.create({
                                    uid: uuid.v4(),
                                    name: "deactivate-sub-module-item",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id:submodule.id,
                                    sub_module_item_id: submodule_item.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_item_id: submodule_item.id,
                                        sub_module_id:submodule.id,
                                        role_id: 1
                                    })
                                });
                                app_item_action.create({
                                    uid: uuid.v4(),
                                    name: "show-sub-modules-item",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id:submodule.id,
                                    sub_module_item_id: submodule_item.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_item_id: submodule_item.id,
                                        sub_module_id:submodule.id,
                                        role_id: 1
                                    })
                                });
                           
                            })

                            // submodule item
                        });
                    }).then(() => {
                        // ================================================================
                        // 7: Departments
                        // ================================================================
                        app_submodule.create({
                            uid: uuid.v4(),
                            name: "Departments",
                            link: "departments",
                            icon: "fal fa-building",
                            linkName: "Departments",
                            active: true,
                            module_id: data.id
                        }).then((submodule) => {
                            app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "view-departments",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "add-departments",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "edit-departments",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "activate-departments",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "deactivate-departments",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "view-department-sections",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "add-department-sections",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "edit-department-sections",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                            })
                        })

                    }).then(() => {
                        // ================================================================
                        // 8: Departments Section
                        // ================================================================
                        app_submodule.create({
                            uid: uuid.v4(),
                            name: "Department-section",
                            link: "all-sections",
                            icon: "fal fa-bars",
                            linkName: "Department-section",
                            active: true,
                            module_id: data.id
                        }).then((submodule) => {
                            app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "activate-department-sections",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "deactivate-department-sections",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                            })
                        })
                    }).then(() => {
                        // ================================================================
                        // 9: Zones
                        // ================================================================
                        app_submodule.create({
                            uid: uuid.v4(),
                            name: "Zones",
                            link: "zones",
                            icon: "fal fa-location",
                            linkName: "Zones",
                            active: true,
                            module_id: data.id
                        }).then((submodule) => {
                            app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "view-zones-list",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "add-zones",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "edit-zones",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "activate-zones",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });

                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "deactivate-zones",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "view-zone-regions-list",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                                app_action.create({
                                    uid: uuid.v4(),
                                    name: "add-zone-regions",
                                    active: true,
                                    module_id: data.id,
                                    sub_module_id: submodule.id
                                }).then((action) => {
                                    app_action_permission.create({
                                        permission: "true",
                                        action_id: action.id,
                                        sub_module_id: submodule.id,
                                        module_id: data.id,
                                        role_id: 1
                                    })
                                });
                            })
                        }).then(() => {
                            // ================================================================
                            // 10: Regions
                            // ================================================================
                            app_submodule.create({
                                uid: uuid.v4(),
                                name: "Regions",
                                link: "regions",
                                icon: "fal fa-map-pin",
                                linkName: "Regions",
                                active: true,
                                module_id: data.id
                            }).then((submodule) => {
                                app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "view-regions",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });
                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "add-regions",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "edit-regions",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "activate-regions",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "deactivate-regions",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });
                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "view-districts",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });
                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "add-districts",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "edit-districts",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "transfer-regions",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                })
                            });

                        }).then(() => {
                            // ================================================================
                            // 11: Districts
                            // ================================================================
                            app_submodule.create({
                                uid: uuid.v4(),
                                name: "Districts",
                                link: "districts",
                                icon: "fal fa-map-marker-check",
                                linkName: "Districts",
                                active: true,
                                module_id: data.id
                            }).then((submodule) => {
                                app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "activate-districts",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "deactivate-districts",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "transfer-districts",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                })
                            });
                        }).then(() => {
                            // ================================================================
                            // 20: Units
                            // ================================================================
                            app_submodule.create({
                                uid: uuid.v4(),
                                name: "Units",
                                link: "units",
                                icon: "fal fa-dot-circle",
                                linkName: "Units",
                                active: true,
                                module_d: data.id
                            }).then((submodule) => {
                                app_sub_module_permissions.create({permission: "true", sub_module_id: submodule.id, module_id: data.id, role_id: 1}).then(() => {
                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "add-units",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "edit-units",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "activate-units",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                    app_action.create({
                                        uid: uuid.v4(),
                                        name: "deactivate-units",
                                        active: true,
                                        module_id: data.id,
                                        sub_module_id: submodule.id
                                    }).then((action) => {
                                        app_action_permission.create({
                                            permission: "true",
                                            action_id: action.id,
                                            sub_module_id: submodule.id,
                                            module_id: data.id,
                                            role_id: 1
                                        })
                                    });

                                })
                            });
                        })
                        // End of Module
                    })

                })


            })
        });
    }

};
