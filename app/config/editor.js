app_sub_module_item_permissions.create({permission: true, sub_module_item_id: submodule_item.id, role_id: 1}).then(() => {
    app_action.create({
        uid: uuid.v4(),
        name: "view-sub-modules-list",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({permission: true, action_id: action.id, role_id: 1})
    });
    app_action.create({
        uid: uuid.v4(),
        name: "add-sub-modules",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({permission: true, action_id: action.id, role_id: 1})
    });
    app_action.create({
        uid: uuid.v4(),
        name: "edit-sub-modules",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

    app_action.create({
        uid: uuid.v4(),
        name: "activate-sub-modules",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

    app_action.create({
        uid: uuid.v4(),
        name: "deactivate-sub-modules",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "show-sub-modules",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "view-submodules-item-list",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "add-submodule-items",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

    app_action.create({
        uid: uuid.v4(),
        name: "edit-submodules-item",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "activate-submodules-item",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "deactivate-submodules-item",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "show-submodules-item",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "view-submodule-item-actions-list",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });
    app_action.create({
        uid: uuid.v4(),
        name: "add-submodule-item-actions",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

    app_action.create({
        uid: uuid.v4(),
        name: "edit-submodule-item-actions",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

    app_action.create({
        uid: uuid.v4(),
        name: "activate-submodule-item-actions",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

    app_action.create({
        uid: uuid.v4(),
        name: "deactivate-submodule-item-actions",
        active: true,
         sub_module_id: data.id,
        sub_module_item_id: submodule_item.id
    }).then((action) => {
        app_action_permission.create({
            permission: "true",
            action_id: action.id,
            sub_module_item_id: submodule_item.id,
             sub_module_id: data.id,
            role_id: 1
        })
    });

})