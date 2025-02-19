//
// Copyright (c) 2021 Copyright Holder (Catena-X Consortium)
//
// See the AUTHORS file(s) distributed with this work for additional
// information regarding authorship.
//
// See the LICENSE file(s) distributed with this work for
// additional information regarding license terms.
//
package net.catenax.prs.requests;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.Builder;
import lombok.Value;
import net.catenax.prs.controllers.PrsController;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static io.swagger.v3.oas.annotations.enums.ParameterIn.PATH;
import static net.catenax.prs.dtos.ValidationConstants.VIN_FIELD_LENGTH;

/**
 * Parameter object for {@link PrsController#getPartsTree(PartsTreeByVinRequest)} REST operation.
 */
@Value
@SuppressWarnings({"PMD.CommentRequired"})
public class PartsTreeByVinRequest extends PartsTreeRequestBase {
    @NotBlank
    @Size(min = VIN_FIELD_LENGTH, max = VIN_FIELD_LENGTH)
    @Parameter(description = "Vehicle Identification Number", in = PATH, required = true)
    private String vin;

    /**
     * Generate a new instance of a {@link PartsTreeByVinRequest}.
     * <p>
     * Use {@link #builder()} instead.
     *
     * @param vin    see {@link #getVin()}
     * @param view   see {@link #getView()}
     * @param aspect see {@link #getAspect()}
     * @param depth  see {@link #getDepth()}
     */
    @Builder(toBuilder = true)
    public PartsTreeByVinRequest(final String vin, final String view, final String aspect, final Integer depth) {
        super(view, aspect, depth);
        this.vin = vin;
    }
}
