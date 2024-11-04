from django.db import models
from account.models import User, Area, Building


# defined the assets
class Goodsattributes(models.Model):
    goodsattributesid = models.AutoField(db_column='GoodsAttributesId', primary_key=True)  # Field name made lowercase.
    goodsattributestitle = models.CharField(db_column='GoodsAttributesTitle',
                                            max_length=255)  # Field name made lowercase.
    goodsattributestype = models.IntegerField(db_column='GoodsAttributesType')  # Field name made lowercase.
    goodsattributescreatetime = models.DateTimeField(
        db_column='GoodsAttributesCreateTime')  # Field name made lowercase.
    goodsattributesupdatetime = models.DateTimeField(
        db_column='GoodsAttributesUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='goodsattributes_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'goodsattributes'


class Attributecategory(models.Model):
    attributecategoryid = models.AutoField(db_column='AttributeCategoryId',
                                           primary_key=True)  # Field name made lowercase.
    attributecategoryname = models.CharField(db_column='AttributeCategoryName',
                                             max_length=255)  # Field name made lowercase.
    attributecategorycreatetime = models.DateTimeField(
        db_column='AttributeCategoryCreateTime')  # Field name made lowercase.
    attributecategoryupdatetime = models.DateTimeField(
        db_column='AttributeCategoryUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='attributecategory_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'attributecategory'


class Operationsystem(models.Model):
    operationsystemid = models.AutoField(db_column='OperationSystemId', primary_key=True)  # Field name made lowercase.
    operationsystemname = models.CharField(db_column='OperationSystemName',
                                           max_length=255)  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='operationsystem_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    operationsystemcreatetime = models.DateTimeField(
        db_column='OperationSystemCreateTime')  # Field name made lowercase.
    operationsystemupdatetime = models.DateTimeField(
        db_column='OperationSystemUpdateTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'operationsystem'


class Operationsystemversion(models.Model):
    operationsystemversionid = models.AutoField(db_column='OperationSystemVersionId',
                                                primary_key=True)  # Field name made lowercase.
    operationsystemversionname = models.CharField(db_column='OperationSystemVersionName',
                                                  max_length=255)  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='operationsystemversion_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    operationsystemid = models.ForeignKey(Operationsystem, models.DO_NOTHING, db_column='OperationSystemId',
                                          related_name='operationsystemversion_operationsystemid_set')  # Field name made lowercase.
    operationsystemversioncreatetime = models.DateTimeField(
        db_column='OperationSystemVersionCreateTime')  # Field name made lowercase.
    operationsystemversionupdatetime = models.DateTimeField(
        db_column='OperationSystemVersionUpdateTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'operationsystemversion'


class Computer(models.Model):
    computerpropertynumber = models.IntegerField(db_column='ComputerPropertyNumber',
                                                 primary_key=True)  # Field name made lowercase.
    computername = models.CharField(db_column='ComputerName', max_length=255, blank=True,
                                    null=True)  # Field name made lowercase.
    computermodel = models.CharField(db_column='ComputerModel', max_length=255)  # Field name made lowercase.
    computerip = models.CharField(db_column='ComputerIP', unique=True, max_length=15)  # Field name made lowercase.
    computermacaddress = models.TextField(db_column='ComputerMacAddress')  # Field name made lowercase.
    computerispersonal = models.IntegerField(db_column='ComputerIsPersonal')  # Field name made lowercase.
    computercreatetime = models.DateTimeField(db_column='ComputerCreateTime')  # Field name made lowercase.
    computerupdatetime = models.DateTimeField(db_column='ComputerUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='computer_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    owneruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='OwnerUserId',
                                    related_name='computer_owneruserid_set', blank=True,
                                    null=True)  # Field name made lowercase.
    operationsystemversionid = models.ForeignKey(Operationsystemversion, models.DO_NOTHING,
                                                 db_column='OperationSystemVersionId')  # Field name made lowercase.
    areaid = models.ForeignKey(Area, models.DO_NOTHING, db_column='AreaId', blank=True,
                               null=True)  # Field name made lowercase.
    buildingid = models.ForeignKey(Building, models.DO_NOTHING, db_column='BuildingId', blank=True,
                                   null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'computer'


class Computersealling(models.Model):
    computerseallingid = models.AutoField(db_column='ComputerSeallingId',
                                          primary_key=True)  # Field name made lowercase.
    computerseallingnumber = models.IntegerField(db_column='ComputerSeallingNumber',
                                                 unique=True)  # Field name made lowercase.
    computerseallingcreatetime = models.DateTimeField(
        db_column='ComputerSeallingCreateTime')  # Field name made lowercase.
    computerseallingupdatetime = models.DateTimeField(
        db_column='ComputerSeallingUpdateTime')  # Field name made lowercase.
    isexpired = models.IntegerField(db_column='IsExpired', blank=True, null=True)  # Field name made lowercase.
    computerpropertynumber = models.ForeignKey(Computer, models.DO_NOTHING, db_column='ComputerPropertyNumber',
                                               blank=True, null=True,
                                               related_name='computer_sealings')  # Field name made lowercase.
    updaterid = models.ForeignKey('Updater', models.DO_NOTHING, db_column='UpdaterId', blank=True,
                                  null=True)  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='computersealling_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    internalrepairid = models.ForeignKey('Internalrepair', models.DO_NOTHING, db_column='InternalRepairId', blank=True,
                                         null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'computersealling'


class Goodsgroup(models.Model):
    gooodsgroupid = models.AutoField(db_column='GooodsGroupId', primary_key=True)  # Field name made lowercase.
    gooodsgroupname = models.CharField(db_column='GooodsGroupName', max_length=255)  # Field name made lowercase.
    ispartinsidecomputer = models.IntegerField(db_column='IsPartInsideComputer')  # Field name made lowercase.
    isallowedtosendout = models.IntegerField(db_column='IsAllowedToSendOut')  # Field name made lowercase.
    isallowedtobeaborted = models.IntegerField(db_column='IsAllowedToBeAborted')  # Field name made lowercase.
    isallowedtomove = models.IntegerField(db_column='IsAllowedToMove')  # Field name made lowercase.
    ispossibletorepair = models.IntegerField(db_column='IsPossibleToRepair')  # Field name made lowercase.
    gooodsgroupcreatetime = models.DateTimeField(db_column='GooodsGroupCreateTime')  # Field name made lowercase.
    gooodsgroupupdatetime = models.DateTimeField(db_column='GooodsGroupUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='goodsgroup_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'goodsgroup'


class Goods(models.Model):
    goodsid = models.AutoField(db_column='GoodsId', primary_key=True)  # Field name made lowercase.
    goodsname = models.CharField(db_column='GoodsName', max_length=255,
                                 db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    gooodsgroupid = models.ForeignKey(Goodsgroup, models.DO_NOTHING,
                                      db_column='GooodsGroupId')  # Field name made lowercase.
    goodscreatetime = models.DateTimeField(db_column='GoodsCreateTime')  # Field name made lowercase.
    goodsupdatetime = models.DateTimeField(db_column='GoodsUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='goods_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'goods'


class Assinedattributestogoods(models.Model):
    goodsid = models.OneToOneField(Goods, models.DO_NOTHING, db_column='GoodsId',
                                   primary_key=True)  # Field name made lowercase. The composite primary key (GoodsId, GoodsAttributesId) found, that is not supported. The first column is selected.
    goodsattributesid = models.ForeignKey(Goodsattributes, models.DO_NOTHING,
                                          db_column='GoodsAttributesId')  # Field name made lowercase.
    attributevalue = models.CharField(max_length=255, db_collation='utf8mb3_general_ci')

    class Meta:
        managed = False
        db_table = 'assinedattributestogoods'
        unique_together = (('goodsid', 'goodsattributesid'),)


class Deliveredgoods(models.Model):
    deliveredgoodsid = models.AutoField(db_column='DeliveredGoodsId', primary_key=True)  # Field name made lowercase.
    deliveredgoodsserial = models.IntegerField(db_column='DeliveredGoodsSerial',
                                               unique=True)  # Field name made lowercase.
    deliveredgoodscreatetime = models.DateTimeField(db_column='DeliveredGoodsCreateTime')  # Field name made lowercase.
    deliveredgoodsupdatetime = models.DateTimeField(db_column='DeliveredGoodsUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId', blank=True,
                                      null=True)  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='deliveredgoods_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    owneruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='OwnerUserId',
                                    related_name='deliveredgoods_owneruserid_set', blank=True,
                                    null=True)  # Field name made lowercase.
    updaterid = models.ForeignKey('Updater', models.DO_NOTHING, db_column='UpdaterId', blank=True,
                                  null=True)  # Field name made lowercase.
    relatedcomputerpropertynumber = models.ForeignKey(Computer, models.DO_NOTHING,
                                                      db_column='RelatedComputerPropertyNumber', blank=True,
                                                      null=True)  # Field name made lowercase.
    goodsid = models.ForeignKey(Goods, models.DO_NOTHING, db_column='GoodsId')  # Field name made lowercase.
    areaid = models.ForeignKey(Area, models.DO_NOTHING, db_column='AreaId', blank=True,
                               null=True)  # Field name made lowercase.
    buildingid = models.ForeignKey(Building, models.DO_NOTHING, db_column='BuildingId', blank=True,
                                   null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'deliveredgoods'


class Goodsattributesdefaultvalue(models.Model):
    goodsattributesid = models.OneToOneField(Goodsattributes, models.DO_NOTHING, db_column='GoodsAttributesId',
                                             primary_key=True)
    defaultattributes = models.CharField(db_column='DefaultAttributes', max_length=255,
                                         db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    defaultattributescreatetime = models.DateTimeField(
        db_column='DefaultAttributesCreateTime')  # Field name made lowercase.
    defaultattributesupdatetime = models.DateTimeField(
        db_column='DefaultAttributesUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId', blank=True,
                                      null=True)  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='goodsattributesdefaultvalue_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'goodsattributesdefaultvalue'
        unique_together = (('goodsattributesid', 'defaultattributes'),)


class GoodsgroupAttributecategoryGoodsattributesOrder(models.Model):
    goodsattributesid = models.OneToOneField(Goodsattributes, models.DO_NOTHING, db_column='GoodsAttributesId',
                                             primary_key=True)  # Field name made lowercase. The composite primary key (GoodsAttributesId, GooodsGroupId) found, that is not supported. The first column is selected.
    attributecategoryid = models.ForeignKey(Attributecategory, models.DO_NOTHING,
                                            db_column='AttributeCategoryId')  # Field name made lowercase.
    gooodsgroupid = models.ForeignKey(Goodsgroup, models.DO_NOTHING,
                                      db_column='GooodsGroupId')  # Field name made lowercase.
    order = models.IntegerField(db_column='Order', unique=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'goodsgroup_attributecategory_goodsattributes_order'
        unique_together = (('goodsattributesid', 'gooodsgroupid'),)


# add ticket for each asset
class Ticketstatus(models.Model):
    ticketstatusid = models.AutoField(db_column='TicketStatusId', primary_key=True)  # Field name made lowercase.
    ticketstatusname = models.CharField(db_column='TicketStatusName', max_length=255,
                                        db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    ticketstatuscreatetime = models.DateTimeField(db_column='TicketStatusCreateTime')  # Field name made lowercase.
    ticketstatusupdatetime = models.DateTimeField(db_column='TicketStatusUpdateTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ticketstatus'


class Ticketsubject(models.Model):
    ticketsubjectid = models.AutoField(db_column='TicketSubjectId', primary_key=True)  # Field name made lowercase.
    ticketsubjectname = models.CharField(db_column='TicketSubjectName', max_length=255,
                                         db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    ticketsubjectcreatetime = models.DateTimeField(db_column='TicketSubjectCreateTime')  # Field name made lowercase.
    ticketsubjectupdatetime = models.DateTimeField(db_column='TicketSubjectUpdateTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ticketsubject'


class Ticket(models.Model):
    ticketid = models.AutoField(db_column='TicketId', primary_key=True)  # Field name made lowercase.
    ticketstatusid = models.ForeignKey(Ticketstatus, models.DO_NOTHING,
                                       db_column='TicketStatusId')  # Field name made lowercase.
    ticketsubjectid = models.ForeignKey(Ticketsubject, models.DO_NOTHING,
                                        db_column='TicketSubjectId')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.IntegerField(db_column='UpdaterUserId', blank=True, null=True)  # Field name made lowercase.
    ticketcreatetime = models.DateTimeField(db_column='TicketCreateTime')  # Field name made lowercase.
    ticketupdatetime = models.DateTimeField(db_column='TicketUpdateTime')  # Field name made lowercase.
    ticketdescription = models.TextField(db_column='TicketDescription')  # Field name made lowercase.
    deliveredgoodsid = models.ForeignKey(Deliveredgoods, models.DO_NOTHING, db_column='DeliveredGoodsId', blank=True,
                                         null=True)  # Field name made lowercase.
    computerpropertynumber = models.ForeignKey(Computer, models.DO_NOTHING, db_column='ComputerPropertyNumber',
                                               blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ticket'


class Usersrefferdedticket(models.Model):
    reffereduserid = models.OneToOneField(User, models.DO_NOTHING, db_column='RefferedUserId',
                                          primary_key=True)  # Field name made lowercase. The composite primary key (RefferedUserId, TicketId) found, that is not supported. The first column is selected.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId')  # Field name made lowercase.
    refferedticketdate = models.DateTimeField(db_column='RefferedTicketDate')  # Field name made lowercase.
    refferedticketdescription = models.TextField(db_column='RefferedTicketDescription')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'usersrefferdedticket'
        unique_together = (('reffereduserid', 'ticketid'),)


# operation on asset
class Abortion(models.Model):
    abortionid = models.AutoField(db_column='AbortionId', primary_key=True)  # Field name made lowercase.
    abortioncreatetime = models.DateTimeField(db_column='AbortionCreateTime')  # Field name made lowercase.
    abortionupdatetime = models.DateTimeField(db_column='AbortionUpdateTime')  # Field name made lowercase.
    abortiondonetime = models.DateField(db_column='AbortionDoneTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    owneruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='OwnerUserId',
                                    related_name='abortion_owneruserid_set')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='abortion_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    deliveredgoodsid = models.ForeignKey(Deliveredgoods, models.DO_NOTHING, db_column='DeliveredGoodsId', blank=True,
                                         null=True)  # Field name made lowercase.
    computerpropertynumber = models.ForeignKey(Computer, models.DO_NOTHING, db_column='ComputerPropertyNumber',
                                               blank=True, null=True)  # Field name made lowercase.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'abortion'


class Exchanging(models.Model):
    exchangingid = models.AutoField(db_column='ExchangingId', primary_key=True)  # Field name made lowercase.
    exchangingdescription = models.TextField(db_column='ExchangingDescription')  # Field name made lowercase.
    exchangingupdatetime = models.DateTimeField(db_column='ExchangingUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId', related_name='exchanging_createruserid_set')  # Field name made lowercase.
    userexchangerid = models.ForeignKey(User, models.DO_NOTHING, db_column='UserExchangerId',
                                        related_name='exchanging_userexchangerid_set')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='exchanging_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId', blank=True,
                                      null=True)  # Field name made lowercase.


    class Meta:
        managed = False
        db_table = 'exchanging'


class Computersexchanging(models.Model):
    computerpropertynumber = models.OneToOneField(Computer, models.DO_NOTHING, db_column='ComputerPropertyNumber',
                                                  primary_key=True)  # Field name made lowercase. The composite primary key (ComputerPropertyNumber, ExchangingId) found, that is not supported. The first column is selected.
    exchangingid = models.ForeignKey(Exchanging, models.DO_NOTHING,
                                     db_column='ExchangingId')  # Field name made lowercase.
    createtime = models.DateField(db_column='CreateTime')  # Field name made lowercase.
    donetime = models.DateField(db_column='DoneTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'computersexchanging'
        unique_together = (('computerpropertynumber', 'exchangingid'),)


class Deliveredgoodsexchanging(models.Model):
    deliveredgoodsid = models.OneToOneField(Deliveredgoods, models.DO_NOTHING, db_column='DeliveredGoodsId',
                                            primary_key=True)  # Field name made lowercase. The composite primary key (DeliveredGoodsId, ExchangingId) found, that is not supported. The first column is selected.
    exchangingid = models.ForeignKey(Exchanging, models.DO_NOTHING,
                                     db_column='ExchangingId')  # Field name made lowercase.
    createtime = models.DateField(db_column='CreateTime')  # Field name made lowercase.
    donetime = models.DateField(db_column='DoneTime')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'deliveredgoodsexchanging'
        unique_together = (('deliveredgoodsid', 'exchangingid'),)


class Installation(models.Model):
    installationid = models.AutoField(db_column='InstallationId', primary_key=True)  # Field name made lowercase.
    installationdescription = models.TextField(db_column='InstallationDescription')  # Field name made lowercase.
    installationupdatetime = models.DateTimeField(db_column='InstallationUpdateTime')  # Field name made lowercase.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='installation_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'installation'


class Installizationsoncomputer(models.Model):
        installationid = models.OneToOneField(Installation, models.DO_NOTHING, db_column='InstallationId',
                                              primary_key=True)  # Field name made lowercase. The composite primary key (InstallationId, ComputerPropertyNumber) found, that is not supported. The first column is selected.
        computerpropertynumber = models.ForeignKey(Computer, models.DO_NOTHING,
                                                   db_column='ComputerPropertyNumber')  # Field name made lowercase.
        installationcreatetime = models.DateTimeField(db_column='InstallationCreateTime')  # Field name made lowercase.
        installationdonetime = models.DateField(db_column='InstallationDoneTime')  # Field name made lowercase.

        class Meta:
            managed = False
            db_table = 'installizationsoncomputer'
            unique_together = (('installationid', 'computerpropertynumber'),)


class Internalrepair(models.Model):
    internalrepairid = models.AutoField(db_column='InternalRepairId', primary_key=True)  # Field name made lowercase.
    internalrepairdescription = models.TextField(db_column='InternalRepairDescription')  # Field name made lowercase.
    internalrepairchangingdescription = models.TextField(
        db_column='InternalRepairChangingDescription')  # Field name made lowercase.
    internalrepaircreatetime = models.DateTimeField(db_column='InternalRepairCreateTime')  # Field name made lowercase.
    internalrepairupdatetime = models.DateTimeField(db_column='InternalRepairUpdateTime')  # Field name made lowercase.
    internalrepairdonetime = models.DateField(db_column='InternalRepairDoneTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='internalrepair_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    deliveredgoodsid = models.ForeignKey(Deliveredgoods, models.DO_NOTHING,
                                         db_column='DeliveredGoodsId')  # Field name made lowercase.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'internalrepair'
        ordering = ["-internalrepaircreatetime"]


class Outbounddocument(models.Model):
    outbounddocumentserial = models.AutoField(db_column='OutboundDocumentSeriaL',
                                              primary_key=True)  # Field name made lowercase.
    outbounddocumentdescription = models.TextField(
        db_column='OutboundDocumentDescription')  # Field name made lowercase.
    outbounddocumentcreatetime = models.DateTimeField(
        db_column='OutboundDocumentCreateTime')  # Field name made lowercase.
    outbounddocumentupdatetime = models.DateTimeField(
        db_column='OutboundDocumentUpdateTime')  # Field name made lowercase.
    outbounddocumentdonetime = models.DateField(db_column='OutboundDocumentDoneTime')  # Field name made lowercase.
    deliveredgoodsid = models.ForeignKey(Deliveredgoods, models.DO_NOTHING,
                                         db_column='DeliveredGoodsId')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    owneruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='OwnerUserId',
                                    related_name='outbounddocument_owneruserid_set')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='outbounddocument_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'outbounddocument'


class Updater(models.Model):
    updaterid = models.AutoField(db_column='UpdaterId', primary_key=True)  # Field name made lowercase.
    updatercreatetime = models.DateTimeField(db_column='UpdaterCreateTime')  # Field name made lowercase.
    updaterupdatetime = models.DateTimeField(db_column='UpdaterUpdateTime')  # Field name made lowercase.
    updaterdonetime = models.DateField(db_column='UpdaterDoneTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='updater_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    owneruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='OwnerUserId',
                                    related_name='updater_owneruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.
    ticketid = models.ForeignKey(Ticket, models.DO_NOTHING, db_column='TicketId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'updater'


class Replacementdeliveygoodsinupdate(models.Model):
    updaterid = models.OneToOneField(Updater, models.DO_NOTHING, db_column='UpdaterId',
                                     primary_key=True)  # Field name made lowercase. The composite primary key (UpdaterId, DeliveredGoodsId) found, that is not supported. The first column is selected.
    deliveredgoodsid = models.ForeignKey(Deliveredgoods, models.DO_NOTHING,
                                         db_column='DeliveredGoodsId')  # Field name made lowercase.
    replacementdescription = models.TextField(db_column='ReplacementDescription')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'replacementdeliveygoodsinupdate'
        unique_together = (('updaterid', 'deliveredgoodsid'),)


class Softwares(models.Model):
    softwareid = models.AutoField(db_column='SoftwareId', primary_key=True)  # Field name made lowercase.
    softwarename = models.CharField(db_column='SoftwareName', max_length=255,
                                    db_collation='utf8mb3_general_ci')  # Field name made lowercase.
    softwarecreatetime = models.DateTimeField(db_column='SoftwareCreateTime')  # Field name made lowercase.
    softwareupdatetime = models.DateTimeField(db_column='SoftwareUpdateTime')  # Field name made lowercase.
    createruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='CreaterUserId')  # Field name made lowercase.
    updateruserid = models.ForeignKey(User, models.DO_NOTHING, db_column='UpdaterUserId',
                                      related_name='softwares_updateruserid_set', blank=True,
                                      null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'softwares'


class Softwaresininstallization(models.Model):
    installationid = models.OneToOneField(Installation, models.DO_NOTHING, db_column='InstallationId', primary_key=True)  # Field name made lowercase. The composite primary key (InstallationId, SoftwareId) found, that is not supported. The first column is selected.
    softwareid = models.ForeignKey(Softwares, models.DO_NOTHING, db_column='SoftwareId')  # Field name made lowercase.
    usageofsoftwaresininstallization = models.TextField(db_column='UsageOfSoftwaresInInstallization')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'softwaresininstallization'
        unique_together = (('installationid', 'softwareid'),)


class Usersexchanging(models.Model):
    userid = models.OneToOneField(User, models.DO_NOTHING, db_column='UserId',
                                  primary_key=True)  # Field name made lowercase. The composite primary key (UserId, ExchangingId) found, that is not supported. The first column is selected.
    exchangingid = models.ForeignKey(Exchanging, models.DO_NOTHING,
                                     db_column='ExchangingId')  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'usersexchanging'
        unique_together = (('userid', 'exchangingid'),)
